import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { EventType } from '$lib/types/event';

export const SAVED_STORAGE_KEY = 'veritas.savedItems.v1';

export interface SavedIntelligenceRef {
	id: string;
	type: EventType;
	title: string;
	savedAt: string;
}

function isEventType(v: string): v is EventType {
	return v === 'event' || v === 'topic_event' || v === 'global_event';
}

function readStorage(): SavedIntelligenceRef[] {
	if (!browser) return [];
	try {
		const raw = localStorage.getItem(SAVED_STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw) as unknown;
		if (!Array.isArray(parsed)) return [];
		const out: SavedIntelligenceRef[] = [];
		for (const x of parsed) {
			if (!x || typeof x !== 'object') continue;
			const o = x as Record<string, unknown>;
			if (typeof o.id !== 'string' || typeof o.title !== 'string') continue;
			if (typeof o.type !== 'string' || !isEventType(o.type)) continue;
			if (typeof o.savedAt !== 'string') continue;
			out.push({
				id: o.id,
				type: o.type,
				title: o.title,
				savedAt: o.savedAt
			});
		}
		return out;
	} catch {
		return [];
	}
}

function createSavedStore() {
	const { subscribe, set, update } = writable<SavedIntelligenceRef[]>(readStorage());

	if (browser) {
		subscribe((value) => {
			try {
				localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(value));
			} catch {
				/* ignore quota / private mode */
			}
		});
	}

	return { subscribe, set, update };
}

export const savedItems = createSavedStore();

export function toggleSaved(ref: Pick<SavedIntelligenceRef, 'id' | 'type' | 'title'>) {
	savedItems.update((items) => {
		const i = items.findIndex((x) => x.id === ref.id && x.type === ref.type);
		if (i >= 0) return items.filter((_, j) => j !== i);
		return [{ ...ref, savedAt: new Date().toISOString() }, ...items];
	});
}

export function removeSaved(id: string, type: EventType) {
	savedItems.update((items) => items.filter((x) => !(x.id === id && x.type === type)));
}

export function clearSaved() {
	savedItems.set([]);
}
