import { Colors } from '@/constants/Colors';
import { useFocusContext } from '@/ts/contexts/FocusContext';
import { useMemo } from 'react';
import { Image, Text } from 'react-native';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface GalleryItemProps {
	title: string;
	image: string;
	index: number;
}

function GalleryItem({ title, image, index }: GalleryItemProps) {
	const { focusedComponent } = useFocusContext();

	const isFocused = useMemo(() => focusedComponent.name === 'moviesList' && focusedComponent.focusedIndex === index, [focusedComponent]);

	const animatedStyle = useAnimatedStyle(() => {
		// when the item is focused, apply a scale transform
		return {
			transform: [{ scale: withTiming(isFocused ? 1.1 : 1, { duration: 200, easing: Easing.out(Easing.cubic) }) }],
			opacity: withTiming(isFocused ? 1 : 0.7),
		};
	});

	return (
		<Animated.View
			style={[
				{
					width: 200,
					height: 100,
					marginRight: 20,
					marginVertical: 10,
					borderWidth: isFocused ? 2 : 1,
					borderColor: isFocused ? Colors.dark.link : Colors.dark.icon,
					justifyContent: 'center',
					alignItems: 'center',
					borderRadius: 10,
				},
				animatedStyle,
			]}
		>
			<Image source={{ uri: image }} style={{ width: '100%', height: '100%', borderRadius: 10, overflow: 'hidden' }} resizeMode="cover" />
			<Text style={{ position: 'absolute', bottom: 10, color: 'white', left: 10 }}>{title}</Text>
		</Animated.View>
	);
}

export default GalleryItem;
