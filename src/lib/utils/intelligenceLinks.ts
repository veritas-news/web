import type { EventType } from '$lib/types/event';

export function intelligenceDetailPath(type: EventType, id: string): string {
	const enc = encodeURIComponent(id);
	switch (type) {
		case 'event':
			return `/events/${enc}`;
		case 'topic_event':
			return `/topics/${enc}`;
		case 'global_event':
			return `/global/${enc}`;
		default:
			return '/';
	}
}
