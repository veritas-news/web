import type { AnyDetail, EventType, UnifiedTimelineItem } from '$lib/types/event';

export type { UnifiedTimelineItem, EventType };

export interface TimelineCardModel {
  id: string;
  type: EventType;
  title: string;
  subtitle: string;
  description: string;
  timestamp: string;
  impactScore: number;
  analystConviction: number;
  metrics: string[];
}

export interface UnifiedPageData {
  items: UnifiedTimelineItem[];
  hasMore: boolean;
  nextCursor: string | null;
  selectedId: string | null;
  detail: AnyDetail | null;
  listError: string | null;
  detailError: string | null;
}
