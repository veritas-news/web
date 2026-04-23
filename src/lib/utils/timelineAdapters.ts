import type { Event, GlobalEvent, TopicEvent, UnifiedTimelineItem } from '$lib/types/event';

export function eventToUnified(item: Event): UnifiedTimelineItem {
	const impact = item.impactScore ?? 0;
	return {
		id: item.id,
		type: 'event',
		title: item.title,
		subtitle: item.category,
		description: item.description ?? '',
		timelineAt: item.lastUpdatedAt ?? item.happenedAt,
		impactScore: impact,
		analystConviction: item.analystConviction ?? null,
		sentimentIndex: item.sentimentIndex,
		primaryCategory: item.category,
		location: undefined,
		clusterSize: item.clusterSize,
		sourceCount: item.sourceCount
	};
}

export function topicToUnified(item: TopicEvent): UnifiedTimelineItem {
	const impact = item.impactScore ?? 0;
	const timelineAt = item.lastUpdatedAt ?? item.timeEnd;
	return {
		id: item.id,
		type: 'topic_event',
		title: item.title,
		subtitle: item.regionScope,
		description: item.description ?? '',
		timelineAt,
		impactScore: impact,
		analystConviction: item.analystConviction ?? null,
		regionScope: item.regionScope,
		articleCount: item.articleCount
	};
}

export function globalToUnified(item: GlobalEvent): UnifiedTimelineItem {
	const impact = item.impactScore ?? 0;
	const timelineAt = item.lastUpdatedAt ?? item.timeEnd;
	return {
		id: item.id,
		type: 'global_event',
		title: item.title,
		subtitle: 'Global',
		description: item.description ?? '',
		timelineAt,
		impactScore: impact,
		analystConviction: item.analystConviction ?? null,
		topicCount: item.topicCount,
		eventCount: item.eventCount,
		articleCount: item.articleCount
	};
}
