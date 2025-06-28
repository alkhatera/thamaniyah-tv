export interface PixabayVideoResponse {
	total: number;
	totalHits: number;
	hits: PixabayVideo[];
}

export interface PixabayVideoFormat {
	url: string;
	width: number;
	height: number;
	size: number;
	thumbnail: string;
}

export interface PixabayVideo {
	id: number;
	pageURL: string;
	type: string;
	tags: string;
	duration: number;

	videos: {
		large: PixabayVideoFormat;
		medium: PixabayVideoFormat;
		small: PixabayVideoFormat;
		tiny: PixabayVideoFormat;
	};

	views: number;
	downloads: number;
	likes: number;
	comments: number;

	user_id: number;
	user: string;
	userImageURL: string;
	userURL: string;

	isAiGenerated: boolean;
	isGRated: boolean;
	noAiTraining: boolean;
	isLowQuality: boolean | 0 | 1; // sometimes 0 is returned instead of boolean
}

export interface PixabayVideoFormat {
	url: string;
	width: number;
	height: number;
	size: number;
	thumbnail: string;
}

export interface VideoProgress {
	url: string;
	seconds: number;
}
