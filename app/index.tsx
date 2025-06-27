import Banner from '@/components/Banner';
import Menu from '@/components/Menu';
import VideoList from '@/components/VideoList';
import { Colors } from '@/constants/Colors';
import useBackHandler from '@/hooks/useBackHandler';
import { Image, SafeAreaView, ScrollView, View } from 'react-native';

function Home() {
	useBackHandler(() => {});

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{/* Menu */}
			<Menu />

			<ScrollView style={{ backgroundColor: Colors.dark.background }}>
				<View style={{ backgroundColor: Colors.dark.background, marginTop: 32, marginLeft: 100, paddingHorizontal: 24 }}>
					<Banner />

					<VideoList />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default Home;
