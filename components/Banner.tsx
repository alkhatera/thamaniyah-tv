import { Colors } from '@/constants/Colors';
import useDebouncedTVEventHandler from '@/hooks/useDebouncedTvEventHandler';
import { useFocusContext } from '@/ts/contexts/FocusContext';
import useVideosStore from '@/ts/zustand/store';
import { LinearGradient } from 'expo-linear-gradient';
import { useMemo } from 'react';
import { Image, useTVEventHandler, View } from 'react-native';

function Banner() {
	const { focusedComponent, changeFocus } = useFocusContext();
	const { videos } = useVideosStore();

	const isFocused = useMemo(() => focusedComponent.name === 'banner', [focusedComponent.name]);
	const selectedVideo = useMemo(
		() => (focusedComponent.name === 'moviesList' ? videos[focusedComponent.focusedIndex] : videos[0]),
		[focusedComponent, videos]
	);

	useDebouncedTVEventHandler((event) => {
		const { eventType, eventKeyAction } = event;

		if (eventType !== 'focus' && eventType !== 'blur' && focusedComponent.name === 'banner') {
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
		<View style={{ width: '100%', height: '100%', borderWidth: isFocused ? 2 : 0, borderColor: isFocused ? 'blue' : 'gray' }}>
			<Image source={{ uri: selectedVideo?.videos?.medium?.thumbnail }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
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
		</View>
	);
}

export default Banner;
