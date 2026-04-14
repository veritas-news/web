<section class="auth-placeholder" aria-label="Authentication placeholder">
	<p class="label">Auth</p>
	<p class="copy">Placeholder only. Routes open.</p>
</section>

<style>
	.auth-placeholder {
		display: grid;
		gap: 0.15rem;
		min-width: 10rem;
		border: 1px solid rgba(133, 148, 178, 0.18);
		background: rgba(10, 19, 35, 0.46);
		border-radius: 1rem;
		padding: 0.8rem 1rem;
	}

	.label {
		margin: 0;
		color: var(--ink-soft);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.copy {
		margin: 0;
		color: var(--ink);
		font-size: 0.92rem;
		line-height: 1.35;
	}

	@media (max-width: 720px) {
		.auth-placeholder {
			min-width: unset;
		}
	}
</style>
