import { useFocusContext } from '@/ts/contexts/FocusContext';
import { useEffect, useRef } from 'react';
import { FlatList, useTVEventHandler } from 'react-native';
import GalleryItem from './GalleryItem';

const items = [
	{
		name: 'Item 1',
		image: 'https://placehold.co/200x100/png',
	},
	{
		name: 'Item 2',
		image: 'https://placehold.co/200x100/png',
	},
	{
		name: 'Item 3',
		image: 'https://placehold.co/200x100/png',
	},
	{
		name: 'Item 4',
		image: 'https://placehold.co/200x100/png',
	},
	{
		name: 'Item 5',
		image: 'https://placehold.co/200x100/png',
	},
	{
		name: 'Item 6',
		image: 'https://placehold.co/200x100/png',
	},
	{
		name: 'Item 7',
		image: 'https://placehold.co/200x100/png',
	},
	{
		name: 'Item 8',
		image: 'https://placehold.co/200x100/png',
	},
];

function VideoList() {
	const flatListRef = useRef<FlatList>(null);

	const { focusedComponent, changeFocus } = useFocusContext();

	useTVEventHandler((event: any) => {
		const { eventType, eventKeyAction } = event;

		if (eventType !== 'focus' && eventType !== 'blur' && focusedComponent.name === 'moviesList') {
			// Go to next item when right button is pressed
			if (eventType === 'right' && focusedComponent.focusedIndex < items.length - 1) {
				changeFocus('moviesList', focusedComponent.focusedIndex + 1);
			}

			// Go to previous item when left button is pressed
			// Or, open the menu if focused on the first item
			if (eventType === 'left' && focusedComponent.focusedIndex > 0) {
				changeFocus('moviesList', focusedComponent.focusedIndex - 1);
			} else if (eventType === 'left' && focusedComponent.focusedIndex === 0) {
				changeFocus('menu');
			}

			if (eventType === 'up') {
				changeFocus('banner', 0);
			}
		}
	});

	// Auto-scroll to focused item
	// Commented out because it may cause issues with focus management
	// useEffect(() => {
	// 	if (focusedComponent.name === 'moviesList' && flatListRef.current) {
	// 		flatListRef.current.scrollToIndex({
	// 			index: focusedComponent.focusedIndex,
	// 			viewPosition: 0.5, // center the item
	// 			animated: true,
	// 		});
	// 	}
	// }, [focusedComponent]);

	return (
		<FlatList
			ref={flatListRef}
			data={items}
			horizontal
			keyExtractor={(item, index) => index.toString()}
			renderItem={({ item, index }) => <GalleryItem title={item.name} image={item.image} index={index} />}
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
			style={{ marginBottom: 50 }}
			onScrollToIndexFailed={() => {
				// Handle the case where the index is out of range
				console.warn('Index out of range');
			}}
		/>
	);
}

export default VideoList;
