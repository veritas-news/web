<script lang="ts">
	import { getLocale, isLocale, locales, setLocale } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';

	const labelFor = (code: string) => {
		if (code === 'en') return m.lang_en();
		if (code === 'zh') return m.lang_zh();
		if (code === 'de') return m.lang_de();
		if (code === 'fr') return m.lang_fr();
		if (code === 'ru') return m.lang_ru();
		if (code === 'es') return m.lang_es();
		if (code === 'vi') return m.lang_vi();
		return code;
	};

	function onSelect(e: Event) {
		const v = (e.target as HTMLSelectElement).value;
		if (isLocale(v)) setLocale(v);
	}
</script>

<div class="flex flex-col gap-1">
	<select
		id="veritas-locale"
		class="rounded-panel-sm border border-line/90 bg-paper-lifted px-3 py-2 font-rounded text-sm font-medium text-ink shadow-panel dark:border-line-dark/90 dark:bg-paper-lifted-dark dark:text-ink-dark dark:shadow-panel-dark"
		onchange={onSelect}
		value={getLocale()}
	>
		{#each locales as loc (loc)}
			<option value={loc}>{labelFor(loc)}</option>
		{/each}
	</select>
</div>
