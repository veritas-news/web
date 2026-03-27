import fs from 'node:fs/promises';
import path from 'node:path';
import type { PageServerLoad } from './$types';

const IMAGE = /\.(png|jpe?g|webp|gif|svg)$/i;

export type StaticScreenshot = {
	/** URL path served from /static (e.g. /onboarding_screenshot/1.png) */
	src: string;
	/** File name for accessible description */
	basename: string;
};

async function listImagesUnderStatic(staticRoot: string): Promise<StaticScreenshot[]> {
	const out: StaticScreenshot[] = [];

	async function walk(relPosix: string): Promise<void> {
		const absDir = relPosix ? path.join(staticRoot, ...relPosix.split('/')) : staticRoot;
		let entries: import('node:fs').Dirent[];
		try {
			entries = await fs.readdir(absDir, { withFileTypes: true });
		} catch {
			return;
		}
		for (const ent of entries) {
			const nextRel = relPosix ? `${relPosix}/${ent.name}` : ent.name;
			if (ent.isDirectory()) {
				await walk(nextRel);
			} else if (ent.isFile() && IMAGE.test(ent.name)) {
				out.push({
					src: `/${nextRel}`,
					basename: ent.name
				});
			}
		}
	}

	await walk('');
	out.sort((a, b) => a.src.localeCompare(b.src));
	return out;
}

export const load: PageServerLoad = async () => {
	const staticDir = path.join(process.cwd(), 'static');
	const screenshots = await listImagesUnderStatic(staticDir);
	return { screenshots };
};
