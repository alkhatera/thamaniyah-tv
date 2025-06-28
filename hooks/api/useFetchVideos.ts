import useVideosStore from '@/ts/zustand/store';
import { useQuery } from '@tanstack/react-query';

const PIXABAY_API_KEY = '51088801-a67cbc92f4d579c6c9e77d685';

function useFetchVideos() {
	const { videos, setVideos } = useVideosStore();

	const { data, isLoading } = useQuery({
		queryKey: ['videos'],
		queryFn: async () => {
			try {
				const response = await fetch(`https://pixabay.com/api/videos/?key=${PIXABAY_API_KEY}&q=adventure&per_page=10`);
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				setVideos(data.hits);
				return data;
			} catch (error) {
				console.error('Error fetching videos:', error);
			}
		},
	});

	return {
		videos: videos,
		isLoading: isLoading,
	};
}

export default useFetchVideos;
