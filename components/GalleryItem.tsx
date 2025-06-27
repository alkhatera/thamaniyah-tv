import { useFocusContext } from '@/ts/contexts/FocusContext';
import { Image, Text, View } from 'react-native';

interface GalleryItemProps {
	title: string;
	image: string;
	index: number;
}

function GalleryItem({ title, image, index }: GalleryItemProps) {
	const { focusedComponent } = useFocusContext();

	const isFocused = focusedComponent.name === 'moviesList' && focusedComponent.focusedIndex === index;

	return (
		<View
			style={{
				width: 200,
				height: 100,
				marginRight: 10,
				marginVertical: 10,
				borderWidth: isFocused ? 2 : 1,
				borderColor: isFocused ? 'blue' : 'gray',
				justifyContent: 'center',
				alignItems: 'center',
				borderRadius: 10,
			}}
			onFocus={() => {
				console.log(`Focused on item: ${title}`);
			}}
			hasTVPreferredFocus={false}
		>
			<Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
			<Text style={{ position: 'absolute', bottom: 10, color: 'white', left: 10 }}>{title}</Text>
		</View>
	);
}

export default GalleryItem;
