import { Colors } from '@/constants/Colors';
import useDebouncedTVEventHandler from '@/hooks/useDebouncedTVEventHandler';
import { useFocusContext } from '@/ts/contexts/FocusContext';
import useFavoriteVideos from '@/ts/zustand/useFavoriteVideos';
import useVideosStore from '@/ts/zustand/useVideosStore';
import FeatherIcons from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';

function Banner() {
	const router = useRouter();
	const { focusedComponent, components, changeFocus } = useFocusContext();
	const { videos } = useVideosStore();
	const { isFavorite, addToFavorites, removeFromFavorites } = useFavoriteVideos();

	const playButtonScale = useSharedValue(1);
	const favButtonScale = useSharedValue(1);

	const playButtonAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: playButtonScale.value }],
	}));

	const favButtonAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: favButtonScale.value }],
	}));

	const selectedVideo = useMemo(
		() =>
			components?.find((component) => component.name === 'moviesList')
				? videos[components?.find((component) => component.name === 'moviesList')?.focusedIndex || 0]
				: videos[0],
		[videos, components]
	);

	useDebouncedTVEventHandler((event) => {
		const { eventType, eventKeyAction } = event;

		if (eventType !== 'focus' && eventType !== 'blur' && focusedComponent.name === 'banner') {
			if (eventType === 'select') {
				if (focusedComponent.focusedIndex === 0) {
					playButtonScale.value = withSequence(withTiming(1.2, { duration: 100 }), withSpring(1));
					router.navigate({ pathname: '[videoUrl]', params: { videoUrl: selectedVideo.videos?.large?.url } });
					changeFocus('videoplayer', 0);
				} else if (focusedComponent.focusedIndex === 1) {
					favButtonScale.value = withSequence(withTiming(1.2, { duration: 100 }), withSpring(1));
					if (isFavorite(`${selectedVideo?.id}`)) {
						removeFromFavorites(`${selectedVideo?.id}`);
					} else {
						addToFavorites(`${selectedVideo?.id}`);
					}
				}
			}

			if (eventType === 'right' && focusedComponent.focusedIndex > 0) {
				changeFocus('banner', focusedComponent.focusedIndex - 1);
			} else if (eventType === 'right' && focusedComponent.focusedIndex === 0) {
				changeFocus('menu');
			}

			if (eventType === 'left' && focusedComponent.focusedIndex < 1) {
				changeFocus('banner', focusedComponent.focusedIndex + 1);
			} else if (eventType === 'left' && focusedComponent.focusedIndex === 1) {
				changeFocus('moviesList');
			}

			if (eventType === 'down') {
				changeFocus('moviesList');
			}
		}
	});

	const isFocused = useCallback(
		(index: number) => {
			return focusedComponent.name === 'banner' && focusedComponent.focusedIndex === index;
		},
		[focusedComponent]
	);

	return (
		<View style={{ width: '100%', height: '100%', borderRadius: 10 }}>
			<Image
				source={{ uri: selectedVideo?.videos?.medium?.thumbnail }}
				style={{ width: '100%', height: '100%', borderRadius: 10, overflow: 'hidden' }}
				resizeMode="cover"
			/>
			<LinearGradient
				colors={[
					'transparent',
					'rgba(0,0,0,0.1)',
					'rgba(0,0,0,0.2)',
					'rgba(0,0,0,0.4)',
					'rgba(0,0,0,0.6)',
					'rgba(0,0,0,0.8)',
					Colors.dark.background,
				]}
				locations={[0, 0.2, 0.35, 0.55, 0.75, 0.9, 1]}
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					bottom: 0,
					height: 200, // more space for a gentler fade
				}}
			/>

			<View
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: [{ translateX: -75 }, { translateY: -35 }], // total width is 150px, offset by half
					flexDirection: 'row',
					gap: 20, // add spacing between buttons (or use margin)
					direction: 'rtl',
				}}
			>
				{/* Play Button */}
				<Animated.View
					style={[
						{
							height: 70,
							width: 70,
							borderRadius: 35,
							backgroundColor: 'rgba(255,255,255,0.2)',
							borderColor: isFocused(0) ? Colors.dark.link : 'transparent',
							borderWidth: 2,
							justifyContent: 'center',
							alignItems: 'center',
						},
						playButtonAnimatedStyle,
					]}
				>
					<FeatherIcons
						name="play"
						size={30}
						color={isFocused(0) ? Colors.dark.link : 'rgba(255,255,255,0.5)'}
						style={{ transform: [{ translateX: 2 }] }}
					/>
				</Animated.View>

				{/* Favorite Button */}
				<Animated.View
					style={[
						{
							height: 70,
							width: 70,
							borderRadius: 35,
							backgroundColor: 'rgba(255,255,255,0.2)',
							borderColor: isFocused(1) ? Colors.dark.link : 'transparent',
							borderWidth: 2,
							justifyContent: 'center',
							alignItems: 'center',
						},
						favButtonAnimatedStyle,
					]}
				>
					<Octicons
						name={isFavorite(`${selectedVideo?.id}`) ? 'heart-fill' : 'heart'}
						size={30}
						color={isFocused(1) ? Colors.dark.link : 'rgba(255,255,255,0.5)'}
					/>
				</Animated.View>
			</View>
		</View>
	);
}

export default Banner;
