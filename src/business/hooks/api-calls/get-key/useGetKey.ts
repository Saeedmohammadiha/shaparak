import { Mediator } from '@Mediatr/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GetKeyCommand } from 'business/application/shaparak/get-key/command';
import { pushAlert } from 'business/stores/AppAlertsStore';

import { GetKeyRequest } from 'common/entities/http-dtos/get-key/request';
import { GetKeyError, GetKeyResponse } from 'common/entities/http-dtos/get-key/response';

const mediator = new Mediator();

export function useGetkey() {
	const queryClient = useQueryClient();

	return useMutation<GetKeyResponse, GetKeyError, GetKeyRequest>({
		mutationFn: (data: GetKeyCommand) => mediator.send<GetKeyResponse>(new GetKeyCommand(data)),
		mutationKey: ['get-key'],
		onMutate: (variables) => {
			return () => variables;
		},
		onSuccess: (res) => {
			queryClient.setQueryData(['get-key'], (_oldData: GetKeyResponse | undefined) => res);
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
