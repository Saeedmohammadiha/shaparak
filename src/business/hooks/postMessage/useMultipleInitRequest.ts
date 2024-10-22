import { pushAlert } from 'business/stores/AppAlertsStore';
import { sendPostmessage } from 'common/utils/sendPostMessage';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export function useMultipleInitRequest(needsInitData: boolean, received: boolean, delay: number, duration: number) {
	const { t } = useTranslation('BASE');
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const counter = useRef(0);

	useEffect(() => {
		if (!needsInitData) return;

		if (received) {
			clearInterval(intervalRef.current!);
			return;
		}

		intervalRef.current = setInterval(() => {
			if (!received && counter.current === duration / delay) {
				clearInterval(intervalRef.current!);
				pushAlert({
					type: 'error',
					messageText: t('initErrorText'),
					hasConfirmAction: true,
					actions: {
						onConfirm() {
							sendPostmessage('isFinishedBack', 'true');
						},
						onCloseModal() {
							sendPostmessage('isFinishedBack', 'true');
						}
					}
				});
			}
			sendPostmessage('iFrameReady', 'Hi Parent');
			counter.current++;
		}, delay);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [received, needsInitData]);
}
