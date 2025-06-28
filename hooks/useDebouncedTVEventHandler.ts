import { useEffect, useRef } from 'react';
import { HWEvent, useTVEventHandler } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

function useDebouncedTVEventHandler(callback: (event: HWEvent) => void, delay = 300, enabled = true) {
	const isFocused = useIsFocused();
	const lastCall = useRef(0);
	const callbackRef = useRef(callback);
	const delayRef = useRef(delay);

	// Keep callback and delay up-to-date
	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		delayRef.current = delay;
	}, [delay]);

	useTVEventHandler((evt) => {
		if (!enabled || !isFocused || !evt) return;

		const now = Date.now();
		if (now - lastCall.current < delayRef.current) return;

		lastCall.current = now;
		callbackRef.current(evt);
	});
}

export default useDebouncedTVEventHandler;
