import { Colors } from '@/constants/Colors';
import { useFocusContext } from '@/ts/contexts/FocusContext';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Image, Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { RegularText } from './StyledText';

interface MenuItemProps {
	index: number;
	title: string;
	icon?: string;
	path?: string;
}

function MenuItem({ index, title, icon, path }: MenuItemProps) {
	const { focusedComponent } = useFocusContext();
	const router = useRouter();

	const isMenuOpen = useMemo(() => focusedComponent?.name === 'menu', [focusedComponent]);
	const isFocused = useMemo(() => isMenuOpen && focusedComponent.focusedIndex === index, [focusedComponent, isMenuOpen, index]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: withTiming(isMenuOpen ? 1 : 0, { duration: isMenuOpen ? 650 : 100 }),
			width: withTiming(isMenuOpen ? 100 : 0, { duration: 250 }),
		};
	});

	return (
		<Pressable
			onPress={() => path && router.navigate(path)}
			style={({ focused }) => ({
				height: 30,
				marginBottom: 25,
				marginHorizontal: 25,
				borderRadius: 5,
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: isFocused ? 'rgba(255,255,255,0.1)' : 'transparent',
				direction: 'rtl',
			})}
		>
			{/* Added an image instead of icons because icons keep stealing focus */}
			<View style={{ width: 25, height: 25 }}>
				<Image source={icon} style={{ width: '100%', height: '100%', borderRadius: 13 }} resizeMode="cover" />
			</View>

			<Animated.View style={[animatedStyle, { marginRight: 10 }]}>
				<RegularText
					style={{
						color: isFocused ? Colors.dark.link : Colors.dark.text,
						fontSize: 16,
					}}
				>
					{title}
				</RegularText>
			</Animated.View>
		</Pressable>
	);
}

export default MenuItem;
