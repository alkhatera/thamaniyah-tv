import { create } from 'zustand';

const useVideosProgress = create<{
	videoPositions: { [url: string]: number };
	setVideoPosition: (url: string, seconds: number) => void;
	getVideoPosition: (url: string) => number;
}>((set, get) => ({
	videoPositions: {},

	setVideoPosition: (url, seconds) =>
		set((state) => ({
			videoPositions: {
				...state.videoPositions,
				[url]: seconds,
			},
		})),

	getVideoPosition: (url) => get().videoPositions[url] ?? 0,
}));

export default useVideosProgress;
