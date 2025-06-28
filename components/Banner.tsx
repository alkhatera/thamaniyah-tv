import { Colors } from '@/constants/Colors';
import useDebouncedTVEventHandler from '@/hooks/useDebouncedTVEventHandler';
import { useFocusContext } from '@/ts/contexts/FocusContext';
import useVideosStore from '@/ts/zustand/useVideosStore';
import FeatherIcons from '@expo/vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Image, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';

function Banner() {
	const router = useRouter();
	const { focusedComponent, components, changeFocus } = useFocusContext();
	const { videos } = useVideosStore();

	const scale = useSharedValue(1);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }, { translateX: -35 }, { translateY: -35 }],
	}));

	const isFocused = useMemo(() => focusedComponent.name === 'banner', [focusedComponent.name]);
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
			if (eventType === 'select' && focusedComponent.focusedIndex === 0) {
				scale.value = withSequence(withTiming(1.2, { duration: 100 }), withSpring(1));
				router.navigate({ pathname: '[videoUrl]', params: { videoUrl: selectedVideo.videos?.large?.url } });
				changeFocus('videoplayer', 0);
			}

			if (eventType === 'left' && focusedComponent.focusedIndex > 0) {
				changeFocus('banner', focusedComponent.focusedIndex - 1);
			} else if (eventType === 'left' && focusedComponent.focusedIndex === 0) {
				changeFocus('menu');
			}

			if (eventType === 'down') {
				changeFocus('moviesList');
			}
		}
	});

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

			<Animated.View
				style={[
					{
						position: 'absolute',
						height: 70,
						width: 70,
						borderRadius: 35,
						top: '50%',
						left: '50%',
						backgroundColor: 'rgba(255,255,255,0.2)',
						borderColor: isFocused ? Colors.dark.link : 'transparent',
						borderWidth: 2,
						justifyContent: 'center',
						alignItems: 'center',
					},
					animatedStyle,
				]}
			>
				<FeatherIcons
					name="play"
					size={30}
					color={isFocused ? Colors.dark.link : 'rgba(255,255,255,0.5)'}
					style={{ transform: [{ translateX: 2 }] }}
				/>
			</Animated.View>
		</View>
	);
}

export default Banner;
