export type RelationshipKind =
	| 'topic_membership'
	| 'global_membership'
	| 'peer_event'
	| 'member_event'
	| 'member_topic';

/**
 * Optional peer-object preview for a relationship target.
 * Populated only when the backend inlines preview fields on
 * `/v1/*\/:id/relationships`. See `web/docs/BACKEND_API_GAPS.md`
 * (relationships.preview) for the expected contract.
 */
export interface RelationshipPreview {
	/** Same semantics as kind below, but restricted to concrete target types. */
	targetType?: 'event' | 'topic_event' | 'global_event' | 'topic' | 'global' | string;
	title?: string;
	description?: string;
	happenedAt?: string;
	lastUpdatedAt?: string;
	impactScore?: number;
	imageUrl?: string;
}

export interface RelationshipRef {
	kind: RelationshipKind | string;
	targetId: string;
	relationshipSourceV1: string;
	confidenceV1: number;
	preview?: RelationshipPreview;
}

export interface EventRelationshipsContext {
	schema_version: string;
	eventId: string;
	topicId?: string;
	globalId?: string;
	relationships: RelationshipRef[];
	peerEventIds?: string[];
	metricVersions: Record<string, string>;
}

export interface TopicRelationshipsContext {
	schema_version: string;
	topicId: string;
	globalId?: string;
	eventClusterIds?: string[];
	relationships: RelationshipRef[];
	metricVersions: Record<string, string>;
}

export interface GlobalRelationshipsContext {
	schema_version: string;
	globalId: string;
	topicIds?: string[];
	relationships: RelationshipRef[];
	metricVersions: Record<string, string>;
}

export type RelationshipsSurface = 'event' | 'topic' | 'global';

export type RelationshipsResult<T> =
	| { kind: 'ok'; data: T }
	| { kind: 'unavailable'; message: string }
	| { kind: 'not_found'; message: string }
	| { kind: 'error'; message: string };
