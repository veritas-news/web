/**
 * Realtime client for the Veritas WebSocket stream (`/v1/ws`).
 *
 * The server pushes advisory notifications only — the client is expected to
 * re-query the REST API when an interesting event type arrives. Keeping the
 * protocol tiny means the frontend stays tolerant of message shape drift.
 *
 * Same-origin by default: Vercel rewrites and Vite's dev proxy forward
 * `/v1/ws` to the Go server, mirroring how we fetch `/v1/…` over HTTP.
 */

export type RealtimeEventType =
	| 'hello'
	| 'ping'
	| 'event.created'
	| 'event.updated'
	| 'event.merged'
	| 'hierarchy.updated'
	| 'alert.signal'
	| (string & {});

export interface RealtimeMessage {
	type: RealtimeEventType;
	id?: string;
	occurredAt?: string;
	payload?: unknown;
}

export type RealtimeStatus = 'idle' | 'connecting' | 'open' | 'closed';

type Listener = (msg: RealtimeMessage) => void;
type StatusListener = (status: RealtimeStatus) => void;

const PATH = '/v1/ws';
const MIN_RETRY_MS = 1_000;
const MAX_RETRY_MS = 30_000;

export interface RealtimeClient {
	status(): RealtimeStatus;
	onMessage(listener: Listener): () => void;
	onStatus(listener: StatusListener): () => void;
	close(): void;
}

export function createRealtimeClient(): RealtimeClient {
	if (typeof window === 'undefined') return noopClient;

	const listeners = new Set<Listener>();
	const statusListeners = new Set<StatusListener>();

	let socket: WebSocket | null = null;
	let retryMs = MIN_RETRY_MS;
	let retryTimer: ReturnType<typeof setTimeout> | null = null;
	let disposed = false;
	let status: RealtimeStatus = 'idle';

	function setStatus(next: RealtimeStatus) {
		if (status === next) return;
		status = next;
		for (const fn of statusListeners) fn(next);
	}

	function scheduleReconnect() {
		if (disposed) return;
		if (retryTimer != null) return;
		retryTimer = setTimeout(() => {
			retryTimer = null;
			connect();
		}, retryMs);
		retryMs = Math.min(MAX_RETRY_MS, retryMs * 2);
	}

	function connect() {
		if (disposed) return;
		setStatus('connecting');

		const url = buildWsUrl();
		let ws: WebSocket;
		try {
			ws = new WebSocket(url);
		} catch (err) {
			console.warn('[realtime] socket construction failed', err);
			scheduleReconnect();
			return;
		}
		socket = ws;

		ws.addEventListener('open', () => {
			retryMs = MIN_RETRY_MS;
			setStatus('open');
		});

		ws.addEventListener('message', (e) => {
			const msg = parse(e.data);
			if (!msg) return;
			for (const fn of listeners) {
				try {
					fn(msg);
				} catch (err) {
					console.warn('[realtime] listener threw', err);
				}
			}
		});

		ws.addEventListener('error', () => {
			// Let `close` handle retry scheduling; errors without close should not loop.
		});

		ws.addEventListener('close', () => {
			socket = null;
			setStatus('closed');
			scheduleReconnect();
		});
	}

	function parse(raw: unknown): RealtimeMessage | null {
		if (typeof raw !== 'string') return null;
		try {
			const parsed = JSON.parse(raw) as RealtimeMessage;
			if (!parsed || typeof parsed.type !== 'string') return null;
			return parsed;
		} catch {
			return null;
		}
	}

	connect();

	return {
		status: () => status,
		onMessage(listener) {
			listeners.add(listener);
			return () => listeners.delete(listener);
		},
		onStatus(listener) {
			statusListeners.add(listener);
			listener(status);
			return () => statusListeners.delete(listener);
		},
		close() {
			disposed = true;
			if (retryTimer != null) {
				clearTimeout(retryTimer);
				retryTimer = null;
			}
			if (socket) {
				try {
					socket.close();
				} catch {
					/* ignore */
				}
				socket = null;
			}
			setStatus('closed');
		}
	};
}

function buildWsUrl(): string {
	const loc = window.location;
	const protocol = loc.protocol === 'https:' ? 'wss:' : 'ws:';
	return `${protocol}//${loc.host}${PATH}`;
}

const noopClient: RealtimeClient = {
	status: () => 'idle',
	onMessage: () => () => {},
	onStatus: (fn) => {
		fn('idle');
		return () => {};
	},
	close: () => {}
};
