import Banner from '@/components/Banner';
import Menu from '@/components/Menu';
import VideoList from '@/components/VideoList';
import { Colors } from '@/constants/Colors';
import useFetchVideos from '@/hooks/api/useFetchVideos';
import useBackHandler from '@/hooks/useBackHandler';
import { Alert, SafeAreaView, TVFocusGuideView, View } from 'react-native';

function Home() {
	useFetchVideos();

	useBackHandler(() => {
		Alert.alert('الخروج من التطبيق', 'هل آنت متآكد من خروجك من التطبيق؟', [
			{
				text: 'لا',
				style: 'cancel',
			},
			{
				text: 'نعم',
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
			<Menu />

			<View style={{ flex: 1, backgroundColor: Colors.dark.background }}>
				<TVFocusGuideView style={{ flex: 1 }} trapFocusRight trapFocusUp>
					<Banner />
				</TVFocusGuideView>
				<TVFocusGuideView>
					<VideoList />
				</TVFocusGuideView>
			</View>
		</SafeAreaView>
	);
}

export default Home;
