import type { RelationshipRef } from '$lib/types/relationships';

/** Route prefix used when `preview.targetType` is present or inferred from `kind`. */
function routeForTargetType(targetType: string | undefined): 'events' | 'topics' | 'global' {
	switch (targetType) {
		case 'topic':
		case 'topic_event':
			return 'topics';
		case 'global':
		case 'global_event':
			return 'global';
		case 'event':
			return 'events';
		default:
			return 'events';
	}
}

function routeForKind(kind: string): 'events' | 'topics' | 'global' {
	switch (kind) {
		case 'topic_membership':
		case 'member_topic':
			return 'topics';
		case 'global_membership':
			return 'global';
		case 'peer_event':
		case 'member_event':
			return 'events';
		default:
			return 'events';
	}
}

/**
 * Build the detail-page URL for a relationship reference.
 * Prefers the preview's `targetType` (if provided by the backend), otherwise
 * infers from the edge `kind`.
 */
export function hrefForRelationship(rel: RelationshipRef): string {
	const base = rel.preview?.targetType
		? routeForTargetType(rel.preview.targetType)
		: routeForKind(rel.kind);
	return `/${base}/${encodeURIComponent(rel.targetId)}`;
}

const KIND_LABEL: Record<string, string> = {
	topic_membership: 'in topic',
	global_membership: 'in global',
	peer_event: 'related event',
	member_event: 'member event',
	member_topic: 'member topic'
};

export function formatRelationshipKind(kind: string): string {
	return KIND_LABEL[kind] ?? kind.replace(/_/g, ' ');
}

export function formatRelationshipDate(iso?: string): string {
	if (!iso) return '';
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return '';
	return d.toISOString().slice(0, 10);
}

/**
 * True when the backend has enriched a relationship with any preview content
 * (title or description). Used to decide whether to render the preview UI
 * vs. the raw-id fallback.
 */
export function hasPreviewContent(rel: RelationshipRef): boolean {
	const p = rel.preview;
	if (!p) return false;
	return Boolean(p.title || p.description);
}
