import useDebouncedTVEventHandler from '@/hooks/useDebouncedTVEventHandler';
import { PixabayVideo } from '@/ts/ types';
import { useFocusContext } from '@/ts/contexts/FocusContext';
import { generateVideoTitle } from '@/ts/utils';
import { useRef } from 'react';
import { FlatList, Text, View, useWindowDimensions } from 'react-native';
import GalleryItem from './GalleryItem';

interface VideoGridProps {
	videos: PixabayVideo[];
}

function VideoGrid({ videos }: VideoGridProps) {
	const flatListRef = useRef<FlatList>(null);
	const { width } = useWindowDimensions();

	const numColumns = 4;
	const itemWidth = (width - 140) / numColumns - 20;

	const { focusedComponent, changeFocus } = useFocusContext();

	useDebouncedTVEventHandler((event) => {
		const { eventType, eventKeyAction } = event;

		if (eventType !== 'focus' && eventType !== 'blur' && focusedComponent.name === 'favorites') {
			if (eventType === 'left') {
				if (focusedComponent.focusedIndex > 0) {
					changeFocus('favorites', focusedComponent.focusedIndex - 1);
				} else {
					changeFocus('menu', 0);
				}
			}

			if (eventType === 'right') {
				if (focusedComponent.focusedIndex < videos.length - 1) {
					changeFocus('favorites', focusedComponent.focusedIndex + 1);
				}
			}

			if (eventType === 'down') {
				if (focusedComponent.focusedIndex + numColumns < videos.length) {
					changeFocus('favorites', focusedComponent.focusedIndex + numColumns);
				}
			}

			if (eventType === 'up') {
				if (focusedComponent.focusedIndex - numColumns >= 0) {
					changeFocus('favorites', focusedComponent.focusedIndex - numColumns);
				}
			}
		}
	});

	return (
		<FlatList
			ref={flatListRef}
			data={videos}
			numColumns={numColumns}
			keyExtractor={(_, index) => index.toString()}
			renderItem={({ item, index }) => (
				<GalleryItem
					title={generateVideoTitle(item.tags, item.duration)}
					image={item.videos?.small?.thumbnail}
					index={index}
					style={{ width: itemWidth, margin: 10 }}
					listName="favorites"
				/>
			)}
			contentContainerStyle={{ padding: 10 }}
			scrollEnabled={false}
			onScrollToIndexFailed={() => {
				console.warn('Index out of range');
			}}
			ListHeaderComponent={
				<View>
					<Text style={{ color: 'white', fontSize: 24, marginBottom: 10 }}>Favorites</Text>
				</View>
			}
		/>
	);
}

export default VideoGrid;
