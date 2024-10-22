import { useEffect, useRef } from 'react';

type Props<TInput> = {
	callback: (e: MessageEvent<TInput>) => void;
	message?: TInput;
};
export default function usePostMessage<T>(props: Props<T>) {
	const { callback, message } = props;
	const hasSentAlready = useRef(false);

	useEffect(() => {
		if (!hasSentAlready.current) {
			hasSentAlready.current = true;
			window.addEventListener('message', callback, false);

			if (message) {
				window.parent.postMessage(message, '*');
			}
		}

		return () => {
			window.removeEventListener('message', callback);
		};
	}, []);
}
