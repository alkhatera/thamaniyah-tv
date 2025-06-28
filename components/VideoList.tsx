import { PixabayVideo } from '@/ts/ types';
import { useFocusContext } from '@/ts/contexts/FocusContext';
import useVideosStore from '@/ts/zustand/useVideosStore';
import { useEffect, useRef } from 'react';
import { FlatList, HWEvent, View } from 'react-native';
import GalleryItem from './GalleryItem';
import useDebouncedTVEventHandler from '@/hooks/useDebouncedTVEventHandler';
import { generateVideoTitle } from '@/ts/utils';

function VideoList() {
	const { videos } = useVideosStore();
	const flatListRef = useRef<FlatList>(null);

	const { focusedComponent, changeFocus } = useFocusContext();

	// Handle TV remote events
	useDebouncedTVEventHandler((event: HWEvent) => {
		const { eventType, eventKeyAction } = event;

		if (eventType !== 'focus' && eventType !== 'blur' && focusedComponent.name === 'moviesList') {
			if (eventType === 'select') {
				changeFocus('banner', 0);
			}

			// Go to next item when left button is pressed
			if (eventType === 'left' && focusedComponent.focusedIndex < videos.length - 1) {
				changeFocus('moviesList', focusedComponent.focusedIndex + 1);
			}

			// Go to previous item when right button is pressed
			// Or, open the menu if focused on the first item
			if (eventType === 'right' && focusedComponent.focusedIndex > 0) {
				changeFocus('moviesList', focusedComponent.focusedIndex - 1);
			} else if (eventType === 'right' && focusedComponent.focusedIndex === 0) {
				changeFocus('menu');
			}

			if (eventType === 'up') {
				changeFocus('banner');
			}
		}
	});

	// Auto-scroll to focused item
	useEffect(() => {
		if (
			focusedComponent.name === 'moviesList' &&
			flatListRef.current &&
			focusedComponent.focusedIndex >= 0 &&
			focusedComponent.focusedIndex < videos.length
		) {
			flatListRef.current?.scrollToIndex({
				index: focusedComponent.focusedIndex,
				viewPosition: 0.5,
				animated: true,
			});
		}
	}, [focusedComponent.focusedIndex]);

	return (
		<FlatList
			ref={flatListRef}
			data={[...videos].reverse()} // Reverse data for RTL
			inverted
			horizontal
			keyExtractor={(item, index) => index.toString()}
			renderItem={({ item, index }: { item: PixabayVideo; index: number }) => (
				<GalleryItem title={generateVideoTitle(item?.tags, item?.duration)} image={item?.videos?.small?.thumbnail} index={index} />
			)}
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{ paddingHorizontal: 10 }}
			onScrollToIndexFailed={() => {
				// Handle the case where the index is out of range
				console.warn('Index out of range');
			}}
			scrollEnabled={false}
			ListHeaderComponent={<View style={{ width: 100 }} />}
			initialScrollIndex={videos.length > 0 ? 0 : undefined}
		/>
	);
}

export default VideoList;
