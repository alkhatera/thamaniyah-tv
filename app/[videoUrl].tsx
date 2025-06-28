import { RegularText } from '@/components/StyledText';
import { Colors } from '@/constants/Colors';
import useBackHandler from '@/hooks/useBackHandler';
import useDebouncedTVEventHandler from '@/hooks/useDebouncedTVEventHandler';
import { useFocusContext } from '@/ts/contexts/FocusContext';
import useVideosProgress from '@/ts/zustand/useVideosProgress';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEventListener } from 'expo';
import { useLocalSearchParams } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useMemo, useState } from 'react';
import { ActivityIndicator, Text, TouchableWithoutFeedback, TVFocusGuideView, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

function VideoPlayer() {
	const { getVideoPosition, setVideoPosition } = useVideosProgress();
	const { focusedComponent, changeFocus } = useFocusContext();
	const params = useLocalSearchParams();
	const scale = useSharedValue(1);

	const [playerStatus, setPlayerStatus] = useState('idle');
	const [playerError, setPlayerError] = useState<string | null>(null);
	const [retryKey, setRetryKey] = useState(0);

	const isFocused = useMemo(() => focusedComponent.name === 'videoplayer', [focusedComponent.name]);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
	}));

	const player = useVideoPlayer(params.videoUrl, (player) => {
		player.loop = true;
		player.seekBy(getVideoPosition(params.videoUrl as string) || 0);
		player.play();
	});

	// Video player event listeners
	useEventListener(player, 'statusChange', ({ status, error }) => {
		setPlayerStatus(status);
		setPlayerError(error?.message || null);
	});

	const handleRetry = () => {
		setPlayerError(null);
		scale.value = withSequence(withTiming(1.2, { duration: 100 }), withSpring(1));
		setRetryKey((prev) => prev + 1);
	};

	// Handle TV remote events
	useDebouncedTVEventHandler((event) => {
		const { eventType, eventKeyAction } = event;

		if (eventType !== 'focus' && eventType !== 'blur' && focusedComponent.name === 'videoplayer' && playerError) {
			if (eventType === 'select' && focusedComponent.focusedIndex === 0) {
				handleRetry();
			}
		}
	});

	// Handle back button press
	useBackHandler(() => {
		changeFocus('banner');
		if (player) {
			player.pause();
			setVideoPosition(params.videoUrl as string, player.currentTime);
		}
	});

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: Colors.dark.background }}>
			<TVFocusGuideView autoFocus>
				{playerError ? (
					<View
						style={{
							backgroundColor: Colors.dark.background,
							height: '100%',
							width: '100%',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Entypo name="video" size={64} color="white" style={{ marginBottom: 16 }} />
						<RegularText style={{ color: 'white', fontSize: 24, marginBottom: 12 }}>خطأ في تحميل الفيديو</RegularText>
						<Text style={{ color: 'white', marginBottom: 12 }}>{playerError}</Text>
						<Animated.View
							style={[
								{
									height: 70,
									width: 70,
									borderRadius: 35,
									backgroundColor: 'rgba(255,255,255,0.2)',
									borderColor: isFocused ? Colors.dark.link : 'transparent',
									borderWidth: 2,
									justifyContent: 'center',
									alignItems: 'center',
								},
								animatedStyle,
							]}
						>
							<TouchableWithoutFeedback onPress={handleRetry}>
								<MaterialIcons name="replay" size={30} color={isFocused ? Colors.dark.link : 'rgba(255,255,255,0.5)'} />
							</TouchableWithoutFeedback>
						</Animated.View>
					</View>
				) : (
					<>
						<VideoView
							key={retryKey} // forces re-render on retry
							style={{
								height: '100%',
								width: '100%',
							}}
							player={player}
							allowsFullscreen
							allowsPictureInPicture
							allowsVideoFrameAnalysis
							contentFit="cover"
							nativeControls
						/>

						{playerStatus === 'loading' && (
							<ActivityIndicator style={{ position: 'absolute', alignSelf: 'center', top: '45%' }} color="white" size="large" />
						)}
					</>
				)}
			</TVFocusGuideView>
		</SafeAreaView>
	);
}

export default VideoPlayer;
