import Menu from '@/components/Menu';
import VideoGrid from '@/components/VideoGrid';
import { Colors } from '@/constants/Colors';
import useBackHandler from '@/hooks/useBackHandler';
import useFavoriteVideos from '@/ts/zustand/useFavoriteVideos';
import useVideosStore from '@/ts/zustand/useVideosStore';
import { useMemo } from 'react';
import { Alert, SafeAreaView, TVFocusGuideView, View } from 'react-native';

function Favorites() {
	const { videos } = useVideosStore();
	const { favoriteVideos } = useFavoriteVideos();

	const videoList = useMemo(() => {
		return videos.filter((video) => favoriteVideos.has(`${video.id}`));
	}, [videos, favoriteVideos]);

	useBackHandler(() => {
		Alert.alert('Exit', 'Are you sure you want to exit?', [
			{
				text: 'Cancel',
				style: 'cancel',
			},
			{
				text: 'Exit',
				style: 'destructive',
				onPress: () => {
					// Handle exit logic here, e.g., close the app or navigate to a different screen
					// For now, we will just log it
					console.log('Exiting the app');
				},
			},
		]);
		return true; // Prevent default back behavior
	});

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{/* Menu */}
			<Menu firstFocus="favorites" />

			<View style={{ flex: 1, backgroundColor: Colors.dark.background }}>
				<TVFocusGuideView style={{ paddingRight: 100, flex: 1 }}>
					<VideoGrid videos={videoList} />
				</TVFocusGuideView>
			</View>
		</SafeAreaView>
	);
}

export default Favorites;
