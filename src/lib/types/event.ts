import type { Article } from '$lib/types/article';

// ── Event type discriminator ──────────────────────────────────────────────
export type EventType = 'event' | 'topic_event' | 'global_event';

// ── Unified Timeline Item (from GET /v1/timeline) ─────────────────────────
export interface UnifiedTimelineItem {
  id: string;
  type: EventType;
  title: string;
  subtitle: string;
  description: string;
  timelineAt: string;
  impactScore: number;
  /** Null when a compact list endpoint omits this field. */
  analystConviction: number | null;
  // Optional analytics
  sentimentIndex?: number;
  articleDensity?: number;
  relevanceGap?: number;
  // Event-specific compact fields
  primaryCategory?: string;
  location?: string;
  clusterSize?: number;
  sourceCount?: number;
  // TopicEvent-specific
  regionScope?: string;
  articleCount?: number;
  // GlobalEvent-specific
  topicCount?: number;
  eventCount?: number;
}

// ── Related items ─────────────────────────────────────────────────────────
export interface RelatedSubEvent {
  id: string;
  title: string;
  /** API: timeline compact row time (JSON: timelineAt) */
  timelineAt?: string;
  subtitle?: string;
  primaryCategory?: string;
  location?: string;
  /** Older payloads only; prefer timelineAt */
  happenedAt?: string;
}

export interface RelatedTopic {
  id: string;
  title: string;
  regionScope: string;
}

// ── Full detail types (from GET /v1/events|topics|global/:id) ─────────────
// Articles + related items are embedded in the detail response.

export interface EventDetail {
  id: string;
  type: 'event';
  title: string;
  subtitle: string;
  description: string;
  primaryCategory: string;
  secondaryCategory?: string;
  location?: string;
  keywords: string[];
  entities: string[];
  happenedAt: string;
  lastUpdatedAt: string;
  generatedAt: string;
  clusterSize: number;
  sourceCount: number;
  impactScore: number;
  analystConviction: number;
  sentimentIndex?: number;
  supportingArticles: Article[];
}

export interface TopicEventDetail {
  id: string;
  type: 'topic_event';
  title: string;
  subtitle: string;
  description: string;
  regionScope: string;
  generatedAt: string;
  lastUpdatedAt: string;
  size: number;
  articleCount: number;
  timeStart: string;
  timeEnd: string;
  impactScore: number;
  analystConviction: number;
  sentimentIndex?: number;
  articleDensity: number;
  relevanceGap: number;
  relatedSubEvents: RelatedSubEvent[];
  supportingArticles: Article[];
}

export interface GlobalEventDetail {
  id: string;
  type: 'global_event';
  title: string;
  subtitle: string;
  description: string;
  generatedAt: string;
  lastUpdatedAt: string;
  impactScore: number;
  analystConviction: number;
  topicCount: number;
  eventCount: number;
  articleCount: number;
  timeStart: string;
  timeEnd: string;
  relatedTopics: RelatedTopic[];
  supportingArticles: Article[];
}

export type AnyDetail = EventDetail | TopicEventDetail | GlobalEventDetail;

// ── Legacy types (kept for individual list endpoints) ─────────────────────
export interface Event {
  id: string;
  title: string;
  description?: string;
  category: string;
  keywords?: string[];
  entities?: string[];
  happenedAt: string;
  lastUpdatedAt: string;
  generatedAt: string;
  clusterSize: number;
  sourceCount: number;
  impactScore?: number;
  sentimentIndex?: number;
  analystConviction?: number | null;
}

export interface TopicEvent {
  id: string;
  title: string;
  description?: string;
  regionScope: string;
  generatedAt: string;
  size: number;
  articleCount: number;
  timeStart: string;
  timeEnd: string;
  lastUpdatedAt: string;
  impactScore?: number;
  analystConviction?: number | null;
}

export interface GlobalEvent {
  id: string;
  title: string;
  description?: string;
  impactScore?: number;
  generatedAt: string;
  topicCount: number;
  eventCount: number;
  articleCount: number;
  timeStart: string;
  timeEnd: string;
  lastUpdatedAt: string;
  analystConviction?: number | null;
}
