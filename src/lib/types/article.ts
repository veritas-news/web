export interface Article {
	id: string;
	title: string;
	description?: string;
	source: string;
	author?: string;
	categories: string[];
	publishedAt: string;
	updatedAt: string;
	link: string;
	imageUrl?: string;
}
