import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export default function useBackHandler(handler: () => any) {
	const isFocused = useIsFocused();

	useEffect(() => {
		if (!isFocused) {
			return; // Do not add back handler if the screen is not focused
		}

		const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
			if (handler) {
				return handler();
			}
		});

		return () => {
			subscription.remove();
		};
	}, [handler, isFocused]);
}
