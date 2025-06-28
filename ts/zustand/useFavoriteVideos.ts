import { create } from 'zustand';

const useFavoriteVideos = create<{
	favoriteVideos: Set<string>;
	addToFavorites: (url: string) => void;
	removeFromFavorites: (url: string) => void;
	isFavorite: (url: string) => boolean;
}>((set, get) => ({
	favoriteVideos: new Set(),

	addToFavorites: (url) =>
		set((state) => ({
			favoriteVideos: new Set(state.favoriteVideos).add(url),
		})),

	removeFromFavorites: (url) =>
		set((state) => {
			const newFavorites = new Set(state.favoriteVideos);
			newFavorites.delete(url);
			return { favoriteVideos: newFavorites };
		}),

	isFavorite: (url) => get().favoriteVideos.has(url),
}));

export default useFavoriteVideos;
