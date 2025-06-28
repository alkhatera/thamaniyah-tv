import useDebouncedTVEventHandler from '@/hooks/useDebouncedTVEventHandler';
import { useFocusContext } from '@/ts/contexts/FocusContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useRouteInfo } from 'expo-router/build/hooks';
import { HWEvent, Image, TVFocusGuideView } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import MenuItem from './MenuItem';
import { RegularText } from './StyledText';

// image
import FavoritesIcon from '@/assets/images/favorites-icon.png';
import HomeIcon from '@/assets/images/home-icon.png';
import ProfilePicture from '@/assets/images/profile.avif';
import SettingsIcon from '@/assets/images/settings-icon.png';

// animation
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const AnimatedTVFocusGuideView = Animated.createAnimatedComponent(TVFocusGuideView);

const MENU_ITEMS = [
	{ title: 'الرئيسية', icon: HomeIcon, path: '/' },
	{ title: 'المفضلة', icon: FavoritesIcon, path: '/favorites' },
	{ title: 'الإعدادات', icon: SettingsIcon, path: '' },
];

interface MenuProps {
	firstFocus?: string;
}

function Menu({ firstFocus }: MenuProps) {
	const router = useRouter();
	const route = useRouteInfo();
	const { focusedComponent, changeFocus } = useFocusContext();

	// Handle TV remote events
	useDebouncedTVEventHandler((event: HWEvent) => {
		const { eventType, eventKeyAction } = event;

		if (eventType !== 'focus' && eventType !== 'blur' && focusedComponent?.name === 'menu') {
			if (eventType === 'select') {
				const currentItem = MENU_ITEMS[focusedComponent.focusedIndex];
				if (currentItem?.path && route.pathname !== currentItem.path) {
					router.push(currentItem.path);
				}
			}

			// Close the menu when the back button is pressed
			if (eventType === 'left') {
				// @ts-ignore
				changeFocus(firstFocus ?? 'banner', 0);
			}

			if (eventType === 'down' && focusedComponent.focusedIndex < MENU_ITEMS.length - 1) {
				changeFocus('menu', focusedComponent.focusedIndex + 1);
			}

			if (eventType === 'up' && focusedComponent.focusedIndex > 0) {
				changeFocus('menu', focusedComponent.focusedIndex - 1);
			}
		}
	});

	const animatedWidth = useAnimatedStyle(() => {
		return {
			width: withSpring(focusedComponent?.name === 'menu' ? 300 : 150, {
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
			end={{ x: 0, y: 0 }} // Top
			start={{ x: 1, y: 0 }}
			style={[
				{
					height: '100%',
					position: 'absolute',
					top: 0,
					right: 0,
					bottom: 0,
					zIndex: 1,
					direction: 'rtl',
				},
				animatedWidth,
			]}
		>
			<AnimatedTVFocusGuideView autoFocus trapFocusRight style={[{ flex: 1, direction: 'rtl', alignItems: 'center' }, contentWidth]}>
				{/* Profile */}
				<Image
					source={ProfilePicture} // Replace with your image URL or local asset
					style={{
						width: 50,
						height: 50,
						top: 30,
						borderRadius: 30,
						marginBottom: 50,
					}}
				/>

				{/* Profile Name */}
				<RegularText
					style={{
						color: 'white',
						fontSize: 16,
						textAlign: 'center',
						marginBottom: 110,
						minWidth: 100,
					}}
				>
					علاء الخاطر
				</RegularText>

				{/* Menu Item */}
				{MENU_ITEMS.map((menuItem, index) => (
					<MenuItem key={index} title={menuItem.title} icon={menuItem.icon} path={menuItem.path} index={index} />
				))}
			</AnimatedTVFocusGuideView>
		</AnimatedLinearGradient>
	);
}

export default Menu;
