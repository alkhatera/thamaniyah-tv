import FocusProvider from '@/ts/contexts/FocusContext';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';

const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Disable reanimated warnings
configureReanimatedLogger({
	level: ReanimatedLogLevel.warn,
	strict: false,
});

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
		HacenEgypt: require('../assets/fonts/HacenEgypt.ttf'),
	});

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
			if (error) {
				console.warn(`Error in loading fonts: ${error}`);
			}
		}
	}, [loaded, error]);

	if (!loaded && !error) {
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider value={DarkTheme}>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<FocusProvider>
						<Stack>
							<Stack.Screen name="index" options={{ headerShown: false }} />
							<Stack.Screen name="favorites" options={{ headerShown: false }} />
							<Stack.Screen name="[videoUrl]" options={{ headerShown: false }} />
						</Stack>
					</FocusProvider>
				</GestureHandlerRootView>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
