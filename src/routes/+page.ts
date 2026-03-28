import { screenshots } from '$lib/screenshots';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return { screenshots };
};
