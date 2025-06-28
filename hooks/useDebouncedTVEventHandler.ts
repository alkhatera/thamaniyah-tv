import { useRef } from 'react';
import { HWEvent, useTVEventHandler } from 'react-native';

function useDebouncedTVEventHandler(callback: (event: HWEvent) => void, delay = 200) {
	const lastCall = useRef(0);

	useTVEventHandler((evt) => {
		const now = Date.now();
		if (now - lastCall.current < delay) return;

		lastCall.current = now;
		callback(evt);
	});
}

export default useDebouncedTVEventHandler;
