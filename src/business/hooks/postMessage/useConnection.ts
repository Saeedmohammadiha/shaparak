import useInitialSettingStore, { InitialSetting } from 'business/stores/initial-setting-store';
import { sendPostmessage } from 'common/utils/sendPostMessage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMultipleInitRequest } from './useMultipleInitRequest';

export const useConnection = () => {
	const navigate = useNavigate();
	const {  setSettings } = useInitialSettingStore((s) => s);
	//we are checking the query string for 'Auth', in all situations it is true except the time that it is false
	const Auth = new URLSearchParams(window.location.search).get('Auth');
	const needsInitData = Auth === 'false' ? false : true;
	const [receivedInitPostmessage, setReceivedInitPostmessage] = useState(false);
	useMultipleInitRequest(needsInitData, receivedInitPostmessage, 500, 5000);

	useEffect(() => {
		window.addEventListener('message', onReceivePostMessage);

		// Clean up the event listener
		return () => {
			window.removeEventListener('message', onReceivePostMessage);
		};
	}, []);

	const onReceivePostMessage = (event: MessageEvent<{ type: string; data: InitialSetting }>) => {
		const type = event.data.type;

		if (type === 'initiateIFrame') {
			initiateIFrameHandler(event.data.data);
		}
		if (type === 'goback') {
			goBackHandler();
		}
	};

	const initiateIFrameHandler = (data: InitialSetting) => {
		setReceivedInitPostmessage(true);
		setSettings({
			idToken: data.idToken,
			refreshToken: data.refreshToken,
			osType: data.osType
		});
	};

	const goBackHandler = () => {
		//set the "base" proberty in the viteconfig file to the base url of the project to access import.meta.env.BASE_URL
		const basePath = import.meta.env.BASE_URL;

		if (window.location.pathname === basePath || `${window.location.pathname}/` === basePath) {
			sendPostmessage('isFinishedBack', 'true');
		} else {
			navigate(-1);
			//send acknowledge to the parent
			sendPostmessage('wentBack', 'true');
		}
	};

	return { readyToLoad: receivedInitPostmessage };
};
