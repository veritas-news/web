import { browser } from '$app/environment';

const DEVICE_KEY = 'veritas.deviceKey.v1';
const USER_KEY = 'veritas.userId.v1';

function randomUUID(): string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		const v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

export function getOrCreateDeviceKey(): string {
	if (!browser) return 'ssr';
	try {
		let k = localStorage.getItem(DEVICE_KEY);
		if (!k) {
			k = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : randomUUID();
			localStorage.setItem(DEVICE_KEY, k);
		}
		return k;
	} catch {
		return randomUUID();
	}
}

export function getStoredUserId(): string | null {
	if (!browser) return null;
	try {
		return localStorage.getItem(USER_KEY);
	} catch {
		return null;
	}
}

export function setStoredUserId(userId: string): void {
	if (!browser) return;
	try {
		localStorage.setItem(USER_KEY, userId);
	} catch {
		/* ignore */
	}
}
