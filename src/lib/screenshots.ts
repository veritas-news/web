const screenshotModules = import.meta.glob('./assets/screenshots/*.{png,jpg,jpeg,webp,gif,svg}', {
	eager: true,
	query: '?url',
	import: 'default'
}) as Record<string, string>;

export type ScreenshotAsset = {
	src: string;
	basename: string;
};

export const screenshots: ScreenshotAsset[] = Object.entries(screenshotModules)
	.map(([modulePath, src]) => ({
		src,
		basename: modulePath.split('/').pop() ?? modulePath
	}))
	.sort((a, b) => a.basename.localeCompare(b.basename, undefined, { numeric: true }));
