import { useFocusContext } from '@/ts/contexts/FocusContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useMemo } from 'react';
import { TVFocusGuideView, useTVEventHandler, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import MenuItem from './MenuItem';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const AnimatedTVFocusGuideView = Animated.createAnimatedComponent(TVFocusGuideView);

function Menu() {
	const { focusedComponent, changeFocus } = useFocusContext();

	const menuItems = useMemo(() => [...Array(5)], []);

	useTVEventHandler((event: any) => {
		const { eventType, eventKeyAction } = event;

		if (eventType !== 'focus' && eventType !== 'blur' && focusedComponent?.name === 'menu') {
			// Close the menu when the back button is pressed
			if (eventType === 'right') {
				changeFocus('banner', 0);
			}

			if (eventType === 'down' && focusedComponent.focusedIndex < menuItems.length - 1) {
				changeFocus('menu', focusedComponent.focusedIndex + 1);
			}

			if (eventType === 'up' && focusedComponent.focusedIndex > 0) {
				changeFocus('menu', focusedComponent.focusedIndex - 1);
			}
		}
	});

	const animatedWidth = useAnimatedStyle(() => {
		return {
			width: withSpring(focusedComponent?.name === 'menu' ? 300 : 100, {
				damping: 15,
				stiffness: 120,
				mass: 0.8,
			}),
		};
	});

	const contentWidth = useAnimatedStyle(() => {
		return {
			width: withSpring(focusedComponent?.name === 'menu' ? 200 : 100, {
				damping: 15,
				stiffness: 120,
				mass: 0.8,
			}),
		};
	});

	return (
		<AnimatedLinearGradient
			colors={[
				'rgba(0,0,0,0.75)', // solid start
				'rgba(0,0,0,0.75)', // solid until 200px
				'rgba(0,0,0,0.6)',
				'rgba(0,0,0,0.4)',
				'rgba(0,0,0,0.2)',
				'rgba(0,0,0,0.1)',
				'transparent',
			]}
			locations={[0, 200 / 300, 220 / 300, 240 / 300, 260 / 300, 280 / 300, 1]}
			start={{ x: 0, y: 0 }} // Top
			end={{ x: 1, y: 0 }}
			style={[
				{
					height: '100%',
					position: 'absolute',
					top: 0,
					left: 0,
					bottom: 0,
					zIndex: 1,
				},
				animatedWidth,
			]}
		>
			<AnimatedTVFocusGuideView autoFocus trapFocusRight style={[{ flex: 1 }, contentWidth]}>
				{/* Profile */}
				<View
					style={{
						backgroundColor: '#808080',
						width: 50,
						height: 50,
						top: 30,
						left: '50%',
						transform: [{ translateX: -25 }],
						borderRadius: 30,
						marginBottom: 110,
					}}
				/>

				{/* Menu Item */}
				{menuItems.map((_, index) => (
					<MenuItem key={index} index={index} />
				))}
			</AnimatedTVFocusGuideView>
		</AnimatedLinearGradient>
	);
}

export default Menu;
