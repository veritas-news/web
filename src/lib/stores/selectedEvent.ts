import { writable } from 'svelte/store';

export function createSelectedEventStore(initialId: string | null = null) {
	const { subscribe, set } = writable(initialId);

	return {
		subscribe,
		select: (id: string) => set(id),
		clear: () => set(null)
	};
}
