import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export default function useBackHandler(handler: () => any) {
	useEffect(() => {
		const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
			if (handler) {
				handler();
			}
			return true; // Prevent default behavior (exit app)
		});

		return () => {
			subscription.remove();
		};
	}, [handler]);
}
