import { StyleProp, Text, TextStyle } from 'react-native';

export function RegularText({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) {
	return <Text style={[style, { fontFamily: 'HacenEgypt' }]}>{children}</Text>;
}
