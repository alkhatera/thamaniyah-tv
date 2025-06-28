import { MOCK_DATA } from '@/ts/data';
import useVideosStore from '@/ts/zustand/useVideosStore';
import { useQuery } from '@tanstack/react-query';

function useFetchVideos() {
	const { videos, setVideos } = useVideosStore();

	const { data, isLoading } = useQuery({
		queryKey: ['videos'],
		queryFn: async () => {
			try {
				if (!process.env.PIXABAY_API_KEY) {
					setTimeout(() => {
						console.warn('No API key set for Pixabay. Using mock data instead.');
					}, 1000);
					setVideos(MOCK_DATA); // Set mock data if API key is not set
					return MOCK_DATA; // Return mock data immediately if API key is not set
				}
				const response = await fetch(`https://pixabay.com/api/videos/?key=${process.env.PIXABAY_API_KEY}&q=adventure&per_page=10`);
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				setVideos(data.hits);
				return data.hits;
			} catch (error) {
				console.error('Error fetching videos:', error);
			} finally {
			}
		},
	});

	return {
		videos: videos,
		isLoading: isLoading,
	};
}

export default useFetchVideos;
