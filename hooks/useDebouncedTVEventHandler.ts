import { useEffect, useRef } from 'react';
import { HWEvent, useTVEventHandler } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

function useDebouncedTVEventHandler(callback: (event: HWEvent) => void, delay = 200) {
	const isFocused = useIsFocused();

	const lastCall = useRef(0);
	const callbackRef = useRef(callback);

	// Keep callback up-to-date
	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useTVEventHandler((evt) => {
		if (!isFocused) return; // Ignore events if the screen is not focused

		const now = Date.now();
		if (now - lastCall.current < delay) return;

		lastCall.current = now;
		callbackRef.current(evt);
	});
}

export default useDebouncedTVEventHandler;
