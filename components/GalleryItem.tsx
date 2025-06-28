import { Colors } from '@/constants/Colors';
import { useFocusContext } from '@/ts/contexts/FocusContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useMemo } from 'react';
import { Image, StyleProp, Text, ViewStyle } from 'react-native';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface GalleryItemProps {
	title: string;
	image: string;
	index: number;
	style?: StyleProp<ViewStyle>;
	listName?: string;
}

function GalleryItem({ title, image, index, style, listName = 'moviesList' }: GalleryItemProps) {
	const { focusedComponent } = useFocusContext();

	const isFocused = useMemo(() => focusedComponent.name === listName && focusedComponent.focusedIndex === index, [focusedComponent]);

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
					marginLeft: 20,
					marginVertical: 10,
					borderWidth: isFocused ? 2 : 1,
					borderColor: isFocused ? Colors.dark.link : Colors.dark.icon,
					justifyContent: 'center',
					alignItems: 'center',
					borderRadius: 10,
					overflow: 'hidden',
				},
				style,
				animatedStyle,
			]}
		>
			<Image source={{ uri: image }} style={{ width: '100%', height: '100%', borderRadius: 10, overflow: 'hidden' }} resizeMode="cover" />
			<LinearGradient
				colors={['transparent', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.6)', Colors.dark.background]}
				locations={[0, 0.2, 0.55, 1]}
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					bottom: 0,
					height: 50, // more space for a gentler fade
				}}
			/>
			<Text style={{ position: 'absolute', bottom: 10, color: 'white', left: 10, right: 10, fontSize: 12 }} numberOfLines={2}>
				{title}
			</Text>
		</Animated.View>
	);
}

export default GalleryItem;
