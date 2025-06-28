import { create } from 'zustand';
import { PixabayVideo } from '../ types';

const useVideosStore = create<{
	videos: PixabayVideo[];
	setVideos: (videos: PixabayVideo[]) => void;
}>((set) => ({
	videos: [] as PixabayVideo[],
	setVideos: (videos: PixabayVideo[]) => set({ videos }),
}));

export default useVideosStore;
