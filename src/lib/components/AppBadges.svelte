<script lang="ts">
	import { m } from "$lib/paraglide/messages.js";

	const appStore = "https://apps.apple.com/app/placeholder";
</script>

<div
	class="flex w-full max-w-xl flex-row items-center sm:max-w-2xl sm:flex-row sm:flex-wrap sm:items-center sm:justify-start md:max-w-3xl lg:max-w-none"
>
	<a
		href={appStore}
		rel="noopener noreferrer"
		target="_blank"
		class=""
		aria-label={m.hero_cta_ios()}
	>
		<img
			class={"w-40"}
			src={"https://apps.apple.com/us/app/veritas-news/id6760917649"}
			alt="App Store"
		/>
	</a>
</div>
