import type { UnifiedTimelineItem } from '$lib/types/event';
import type { TimelineCardModel } from '$lib/types/timeline';
import { formatCompactNumber, formatDateTime } from '$lib/utils/format';

export function toTimelineCard(item: UnifiedTimelineItem): TimelineCardModel {
  const metrics: string[] = [];

  switch (item.type) {
    case 'event':
      if (item.clusterSize != null) metrics.push(`${formatCompactNumber(item.clusterSize)} cluster`);
      if (item.sourceCount != null) metrics.push(`${formatCompactNumber(item.sourceCount)} sources`);
      if (item.location) metrics.push(item.location);
      break;
    case 'topic_event':
      if (item.regionScope) metrics.push(item.regionScope);
      if (item.articleCount != null) metrics.push(`${formatCompactNumber(item.articleCount)} articles`);
      break;
    case 'global_event':
      if (item.topicCount != null) metrics.push(`${formatCompactNumber(item.topicCount)} topics`);
      if (item.eventCount != null) metrics.push(`${formatCompactNumber(item.eventCount)} events`);
      if (item.articleCount != null) metrics.push(`${formatCompactNumber(item.articleCount)} articles`);
      break;
  }

  const signals: string[] = [];
  if (item.sentimentIndex != null && item.type === 'event') {
    signals.push(`Sentiment ${Math.round(item.sentimentIndex)}`);
  }
  if (item.articleDensity != null && item.type !== 'event') {
    signals.push(`Density ${item.articleDensity.toFixed(2)}`);
  }
  if (item.relevanceGap != null && item.type !== 'event') {
    signals.push(`Relevance gap ${item.relevanceGap.toFixed(2)}`);
  }

  return {
    id: item.id,
    type: item.type,
    title: item.title,
    subtitle: item.subtitle,
    description: item.description,
    timestamp: `Updated ${formatDateTime(item.timelineAt)}`,
    impactScore: item.impactScore,
    analystConviction: item.analystConviction ?? null,
    metrics,
    signals
  };
}
