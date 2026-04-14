import { writable } from 'svelte/store';

export function createCursorStore(initialCursor: string | null = null) {
	const { subscribe, set } = writable(initialCursor);

	return {
		subscribe,
		set,
		reset: () => set(null)
	};
}
