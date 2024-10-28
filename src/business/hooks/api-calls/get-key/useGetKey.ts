import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import { GetKeyCommand } from 'business/application/shaparak/get-key/command';
import { pushAlert } from 'business/stores/AppAlertsStore';

import { GetKeyRequest } from 'common/entities/http-dtos/get-key/request';
import { GetKeyError, GetKeyResponse } from 'common/entities/http-dtos/get-key/response';

const mediator = new Mediator();

export function useGetkey() {
	return useMutation<GetKeyResponse, GetKeyError, GetKeyRequest>({
		mutationFn: (data: GetKeyCommand) => mediator.send<GetKeyResponse>(new GetKeyCommand(data)),
		mutationKey: ['get-key'],
		cacheTime: 10 * 60 * 1000,
		onMutate: (variables) => {
			return () => variables;
		},
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (err) => {
			pushAlert({
				type: 'error',
				messageText: err.errors,
				hasConfirmAction: true
			});
		}
	});
}
