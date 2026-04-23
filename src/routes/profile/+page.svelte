<script lang="ts">
	import { authedFetch } from '$lib/api/authed-fetch';
	import { describeAPIError } from '$lib/api/client';

	type UserProfile = {
		userId: string;
		kind: string;
		username: string;
		displayName: string;
		avatarUrl: string;
		bio: string;
		profileUpdatedAt?: string;
	};

	let loading = $state(true);
	let saving = $state(false);
	let errorMsg = $state<string | null>(null);
	let profile = $state<UserProfile | null>(null);

	async function load(): Promise<void> {
		loading = true;
		errorMsg = null;
		try {
			const res = await authedFetch('/v1/me/profile');
			const payload = (await res.json()) as {
				data?: UserProfile;
				error?: { message?: string };
			};
			if (res.status === 401) {
				errorMsg = 'Sign in required to manage your profile.';
				profile = null;
				return;
			}
			if (!res.ok) {
				throw new Error(payload?.error?.message ?? 'Could not load profile.');
			}
			profile = payload.data ?? null;
		} catch (e) {
			errorMsg = describeAPIError(e);
			profile = null;
		} finally {
			loading = false;
		}
	}

	async function save(): Promise<void> {
		if (!profile) return;
		saving = true;
		errorMsg = null;
		try {
			const res = await authedFetch('/v1/me/profile', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username: profile.username || null,
					displayName: profile.displayName || null,
					avatarUrl: profile.avatarUrl || null,
					bio: profile.bio || null
				})
			});
			const payload = (await res.json()) as {
				data?: UserProfile;
				error?: { message?: string };
			};
			if (!res.ok) {
				throw new Error(payload?.error?.message ?? 'Save failed.');
			}
			profile = payload.data ?? profile;
		} catch (e) {
			errorMsg = describeAPIError(e);
		} finally {
			saving = false;
		}
	}

	$effect(() => {
		void load();
	});
</script>

<svelte:head>
	<title>Profile — Veritas</title>
	<meta name="description" content="Account profile and public display settings." />
</svelte:head>

<div class="mx-auto grid max-w-[44rem] gap-sp-6 px-sp-6 pb-sp-10 pt-sp-6">
	<header class="grid gap-sp-3 border-b border-outline-variant pb-sp-4">
		<p class="m-0 font-sans text-label font-bold tracking-[0.08em] text-topic uppercase">Account</p>
		<h1 class="m-0 font-serif text-headline font-semibold">Profile</h1>
		<p class="m-0 max-w-[52ch] leading-[1.65] text-ink-soft">
			Username, display name, avatar URL, and bio are stored with your signed-in identity. Anonymous
			sessions cannot persist profile changes.
		</p>
	</header>

	{#if errorMsg}
		<p
			class="m-0 rounded-sm border border-error-container bg-error-container/15 px-sp-4 py-sp-3 font-sans text-body text-error"
			role="alert"
		>
			{errorMsg}
		</p>
	{/if}

	{#if loading}
		<p class="m-0 text-ink-muted">Loading…</p>
	{:else if profile}
		<form
			class="grid gap-sp-4"
			onsubmit={(e) => {
				e.preventDefault();
				void save();
			}}
		>
			<label class="grid gap-sp-2">
				<span class="font-sans text-label font-semibold text-ink-soft">Username</span>
				<input
					class="rounded-sm border border-outline-variant bg-surface-low px-sp-3 py-sp-2 font-sans text-body text-ink"
					autocomplete="username"
					bind:value={profile.username}
				/>
			</label>
			<label class="grid gap-sp-2">
				<span class="font-sans text-label font-semibold text-ink-soft">Display name</span>
				<input
					class="rounded-sm border border-outline-variant bg-surface-low px-sp-3 py-sp-2 font-sans text-body text-ink"
					autocomplete="name"
					bind:value={profile.displayName}
				/>
			</label>
			<label class="grid gap-sp-2">
				<span class="font-sans text-label font-semibold text-ink-soft">Avatar URL</span>
				<input
					class="rounded-sm border border-outline-variant bg-surface-low px-sp-3 py-sp-2 font-sans text-body text-ink"
					type="url"
					bind:value={profile.avatarUrl}
				/>
			</label>
			<label class="grid gap-sp-2">
				<span class="font-sans text-label font-semibold text-ink-soft">Bio</span>
				<textarea
					class="min-h-[6rem] rounded-sm border border-outline-variant bg-surface-low px-sp-3 py-sp-2 font-sans text-body text-ink"
					bind:value={profile.bio}
				></textarea>
			</label>
			{#if profile.profileUpdatedAt}
				<p class="m-0 font-mono text-label text-ink-muted">Updated {profile.profileUpdatedAt}</p>
			{/if}
			<button
				type="submit"
				class="justify-self-start border border-event bg-event/90 px-sp-5 py-sp-2 font-sans text-label font-bold tracking-[0.06em] text-surface uppercase hover:bg-event disabled:opacity-50"
				disabled={saving}
			>
				{saving ? 'Saving…' : 'Save'}
			</button>
		</form>
	{:else}
		<p class="m-0 text-ink-muted">No profile data.</p>
	{/if}
</div>
