/**
 * Singleton realtime hub for the app. All UI consumers share one WebSocket —
 * re-creating a client per component would cause N parallel connections and
 * miss messages that arrive between mounts.
 */
import { browser } from '$app/environment';
import {
	createRealtimeClient,
	type RealtimeClient,
	type RealtimeMessage,
	type RealtimeStatus
} from '$lib/api/realtime';

let client: RealtimeClient | null = null;

function ensureClient(): RealtimeClient {
	if (!browser) {
		return {
			status: () => 'idle',
			onMessage: () => () => {},
			onStatus: (fn) => {
				fn('idle');
				return () => {};
			},
			close: () => {}
		};
	}
	if (!client) client = createRealtimeClient();
	return client;
}

export function subscribeRealtime(listener: (msg: RealtimeMessage) => void): () => void {
	return ensureClient().onMessage(listener);
}

export function onRealtimeStatus(listener: (status: RealtimeStatus) => void): () => void {
	return ensureClient().onStatus(listener);
}

export function currentRealtimeStatus(): RealtimeStatus {
	return ensureClient().status();
}
