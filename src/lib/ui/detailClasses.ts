/** Shared Tailwind class strings for Event / Topic / Global detail layouts. */
export const detail = {
	root: 'grid gap-sp-8',
	hero: 'grid gap-sp-3 border-b border-outline-variant pb-sp-6',
	heroType: 'flex flex-wrap gap-sp-2',
	subtitle: 'm-0 font-sans text-label font-bold uppercase tracking-[0.08em] text-ink-muted',
	headlineEvent: 'm-0 font-sans text-headline font-semibold leading-snug text-ink',
	headlineTopic: 'm-0 font-sans text-headline font-semibold leading-snug text-ink',
	headlineGlobal: 'm-0 font-display text-display font-bold leading-[1.05] text-ink',
	description: 'm-0 max-w-[72ch] font-sans text-body leading-relaxed text-ink-soft',
	descriptionGlobal: 'm-0 max-w-[72ch] font-sans text-body text-lg leading-relaxed text-ink-soft',
	location:
		'm-0 flex items-center gap-sp-2 font-sans text-label font-semibold uppercase tracking-wide text-ink-muted',
	locationIcon: 'text-event',
	signalMeters: 'grid gap-sp-3',
	meterGroup: 'grid grid-cols-[6rem_1fr_3rem] items-center gap-sp-3',
	meterLabel: 'font-sans text-label font-bold uppercase tracking-[0.08em] text-ink-muted',
	meterBar: 'h-0.5 overflow-hidden bg-surface-highest',
	meterVal: 'text-right font-sans text-label font-bold tabular-nums text-ink-soft',
	metaGrid:
		'grid gap-px bg-outline-variant [grid-template-columns:repeat(auto-fit,minmax(min(100%,10rem),1fr))]',
	chipSection: 'grid gap-sp-3',
	sectionLabel: 'm-0 font-sans text-label font-bold uppercase tracking-[0.08em] text-ink-muted',
	chipGroup: 'flex flex-wrap gap-sp-2',
	articlesSection: 'grid gap-sp-4 border-t border-outline-variant pt-sp-6',
	relatedSection: 'grid gap-sp-4 border-t border-outline-variant pt-sp-6',
	articleList:
		'grid grid-cols-1 gap-sp-4 md:grid-cols-2 md:gap-x-sp-4 md:gap-y-sp-5 [&>*]:min-w-0',
	relatedList: 'grid gap-px bg-outline-variant',
	relatedLink:
		'block text-inherit no-underline outline-offset-2 focus-visible:outline focus-visible:outline-1 focus-visible:outline-event',
	relatedLinkTopic:
		'block text-inherit no-underline outline-offset-2 focus-visible:outline focus-visible:outline-1 focus-visible:outline-topic',
	timespan: 'm-0 flex items-center gap-sp-3 font-sans text-body text-ink-soft',
	timespanLabelTopic: 'font-sans text-label font-bold uppercase tracking-[0.08em] text-topic',
	timespanLabelGlobal: 'font-sans text-label font-bold uppercase tracking-[0.08em] text-global'
} as const;
