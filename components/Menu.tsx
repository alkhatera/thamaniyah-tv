import { useFocusContext } from '@/ts/contexts/FocusContext';
import { useMemo } from 'react';
import { useTVEventHandler, View } from 'react-native';
import MenuItem from './MenuItem';

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

	return (
		<View
			style={[
				{
					backgroundColor: 'rgba(0,0,0,0.75)',
					width: 100,
					height: '100%',
					position: 'absolute',
					top: 0,
					zIndex: 1,
					left: -200,
					transform: [{ translateX: 200 }],
				},
				focusedComponent?.name === 'menu'
					? {
							width: 200,
					  }
					: null,
			]}
		>
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
		</View>
	);
}

export default Menu;
