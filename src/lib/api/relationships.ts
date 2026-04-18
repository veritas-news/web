import { APIError, describeAPIError, get } from '$lib/api/client';
import type {
	EventRelationshipsContext,
	GlobalRelationshipsContext,
	RelationshipsResult,
	TopicRelationshipsContext
} from '$lib/types/relationships';

const MSG_UNAVAILABLE = 'Relationship graph unavailable in this deployment.';
const MSG_NOT_FOUND = 'No relationship data for this id.';

function classify<T>(err: unknown, fallback: string): RelationshipsResult<T> {
	if (err instanceof APIError) {
		if (err.status === 503 || err.code === 'feature_unavailable') {
			return { kind: 'unavailable', message: MSG_UNAVAILABLE };
		}
		if (err.status === 404) {
			return { kind: 'not_found', message: MSG_NOT_FOUND };
		}
	}
	return { kind: 'error', message: describeAPIError(err, { fallback }) };
}

async function fetchContext<T>(
	fetcher: typeof fetch,
	path: string
): Promise<RelationshipsResult<T>> {
	try {
		const data = await get<T>(fetcher, path);
		return { kind: 'ok', data };
	} catch (err) {
		return classify<T>(err, 'Relationships fetch failed.');
	}
}

export function fetchEventRelationships(
	fetcher: typeof fetch,
	id: string
): Promise<RelationshipsResult<EventRelationshipsContext>> {
	return fetchContext<EventRelationshipsContext>(fetcher, `/events/${encodeURIComponent(id)}/relationships`);
}

export function fetchTopicRelationships(
	fetcher: typeof fetch,
	id: string
): Promise<RelationshipsResult<TopicRelationshipsContext>> {
	return fetchContext<TopicRelationshipsContext>(fetcher, `/topics/${encodeURIComponent(id)}/relationships`);
}

export function fetchGlobalRelationships(
	fetcher: typeof fetch,
	id: string
): Promise<RelationshipsResult<GlobalRelationshipsContext>> {
	return fetchContext<GlobalRelationshipsContext>(fetcher, `/global/${encodeURIComponent(id)}/relationships`);
}
