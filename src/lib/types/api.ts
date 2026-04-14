export interface APIEnvelope<T> {
	data: T;
	meta?: Record<string, unknown>;
}

export interface APIErrorPayload {
	error?: {
		code?: string;
		message?: string;
	};
}

export interface PagedEnvelope<T> {
	data: {
		items: T[];
		next_cursor?: string | null;
	};
	meta: {
		count: number;
		limit: number;
		cursor?: string | null;
	};
}

export interface PagedResult<T> {
	items: T[];
	nextCursor: string | null;
	meta: {
		count: number;
		limit: number;
		cursor: string | null;
	};
}

export type QueryValue = string | number | boolean | null | undefined;
export type QueryParams = Record<string, QueryValue>;
