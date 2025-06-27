import { useFocusContext } from '@/ts/contexts/FocusContext';
import { Image, useTVEventHandler, View } from 'react-native';

function Banner() {
	const { focusedComponent, changeFocus } = useFocusContext();

	const isFocused = focusedComponent.name === 'banner';

	useTVEventHandler((event: any) => {
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
		<View style={{ width: '100%', height: '100%', borderWidth: isFocused ? 2 : 1, borderColor: isFocused ? 'blue' : 'gray' }}>
			<Image source={{ uri: 'https://placehold.co/400/png' }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
		</View>
	);
}

export default Banner;
