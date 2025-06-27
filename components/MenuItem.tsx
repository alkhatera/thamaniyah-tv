import { useFocusContext } from '@/ts/contexts/FocusContext';
import { useMemo } from 'react';
import { Pressable } from 'react-native';

interface MenuItemProps {
	index: number;
}

function MenuItem({ index }: MenuItemProps) {
	const { focusedComponent } = useFocusContext();

	const isFocused = useMemo(() => focusedComponent?.name === 'menu' && focusedComponent.focusedIndex === index, [focusedComponent]);

	return (
		<Pressable
			onPress={() => console.log('Menu Item Pressed')}
			style={({ pressed, focused, hovered }) => {
				return {
					backgroundColor: '#808080',
					height: 30,
					marginBottom: 25,
					marginHorizontal: 25,
					borderRadius: 5,
					borderWidth: isFocused ? 2 : 1,
					borderColor: isFocused ? 'blue' : 'gray',
				};
			}}
		>
			{({ focused, hovered, pressed }) => {
				return <></>;
			}}
		</Pressable>
	);
}

export default MenuItem;
