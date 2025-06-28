import Banner from '@/components/Banner';
import Menu from '@/components/Menu';
import VideoList from '@/components/VideoList';
import { Colors } from '@/constants/Colors';
import useBackHandler from '@/hooks/useBackHandler';
import { Alert, SafeAreaView, TVFocusGuideView, View } from 'react-native';

function Home() {
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
			<Menu />

			<View style={{ flex: 1, backgroundColor: Colors.dark.background }}>
				<TVFocusGuideView style={{ paddingLeft: 100, flex: 1 }} trapFocusRight trapFocusUp>
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
