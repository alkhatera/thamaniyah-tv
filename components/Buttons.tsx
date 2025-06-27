import { useScale } from '@/hooks/useScale';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Platform, Pressable, StyleSheet, Text, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';

export const PressableButton = (props: { title: string; log: (entry: string) => void }) => {
	const styles = useDemoStyles();

	return (
		<Pressable
			onFocus={() => props.log(`${props.title} onFocus`)}
			onBlur={() => props.log(`${props.title} onBlur`)}
			onHoverIn={() => props.log(`${props.title} onHoverIn`)}
			onHoverOut={() => props.log(`${props.title} onHoverOut`)}
			onPress={() => props.log(`${props.title} onPress`)}
			onPressIn={() => props.log(`${props.title} onPressIn`)}
			onPressOut={() => props.log(`${props.title} onPressOut`)}
			onLongPress={() => props.log(`${props.title} onLongPress`)}
			style={({ pressed, focused, hovered }) => (pressed || focused || hovered ? styles.pressableFocused : styles.pressable)}
		>
			{({ focused, hovered, pressed }) => {
				return (
					<ThemedText style={styles.pressableText}>
						{pressed ? `${props.title} pressed` : focused ? `${props.title} focused` : hovered ? `${props.title} hovered` : props.title}
					</ThemedText>
				);
			}}
		</Pressable>
	);
};

export const TouchableOpacityButton = (props: { title: string; log: (entry: string) => void }) => {
	const styles = useDemoStyles();

	return (
		<TouchableOpacity
			activeOpacity={0.6}
			style={styles.pressable}
			onFocus={() => props.log(`${props.title} onFocus`)}
			onBlur={() => props.log(`${props.title} onBlur`)}
			onPressIn={() => props.log(`${props.title} onPressIn`)}
			onPressOut={() => props.log(`${props.title} onPressOut`)}
			onLongPress={() => props.log(`${props.title} onLongPress`)}
		>
			<Text style={styles.pressableText}>{props.title}</Text>
		</TouchableOpacity>
	);
};

export const TouchableHighlightButton = (props: { title: string; log: (entry: string) => void }) => {
	const styles = useDemoStyles();
	const underlayColor = useThemeColor({}, 'tint');

	return (
		<TouchableHighlight
			style={styles.pressable}
			underlayColor={underlayColor}
			onFocus={(event) => props.log(`${props.title} onFocus`)}
			onBlur={(event) => props.log(`${props.title} onBlur`)}
			onPressIn={() => props.log(`${props.title} onPressIn`)}
			onPressOut={() => props.log(`${props.title} onPressOut`)}
			onLongPress={() => props.log(`${props.title} onLongPress`)}
		>
			<Text style={styles.pressableText}>{props.title}</Text>
		</TouchableHighlight>
	);
};

export const TouchableNativeFeedbackButton = (props: { title: string; log: (entry: string) => void }) => {
	const styles = useDemoStyles();

	return (
		<TouchableNativeFeedback
			background={TouchableNativeFeedback.SelectableBackground()}
			onPress={() => props.log(`${props.title} onPress`)}
			onPressIn={() => props.log(`${props.title} onPressIn`)}
			onPressOut={() => props.log(`${props.title} onPressOut`)}
			onLongPress={() => props.log(`${props.title} onLongPress`)}
		>
			<View style={styles.pressable}>
				<Text style={styles.pressableText}>{props.title}</Text>
			</View>
		</TouchableNativeFeedback>
	);
};

const useDemoStyles = function () {
	const scale = useScale();
	const highlightColor = useThemeColor({}, 'link');
	const backgroundColor = useThemeColor({}, 'background');
	const tintColor = useThemeColor({}, 'tint');
	const textColor = useThemeColor({}, 'text');
	return StyleSheet.create({
		container: {
			flex: 1,
			flexDirection: 'row',
			alignItems: 'flex-start',
			justifyContent: 'center',
		},
		logContainer: {
			flexDirection: 'row',
			padding: 5 * scale,
			margin: 5 * scale,
			alignItems: 'flex-start',
			justifyContent: 'flex-start',
		},
		logText: {
			maxHeight: 300 * scale,
			width: Platform.isTV || Platform.OS === 'web' ? 300 * scale : 150 * scale,
			fontSize: 10 * scale,
			margin: 5 * scale,
			lineHeight: 12 * scale,
			alignSelf: 'flex-start',
			justifyContent: 'flex-start',
		},
		pressable: {
			borderColor: highlightColor,
			backgroundColor: textColor,
			borderWidth: 1,
			borderRadius: 5 * scale,
			margin: 5 * scale,
		},
		pressableFocused: {
			borderColor: highlightColor,
			backgroundColor: tintColor,
			borderWidth: 1,
			borderRadius: 5 * scale,
			margin: 5 * scale,
		},
		pressableText: {
			color: backgroundColor,
			fontSize: 15 * scale,
		},
	});
};
