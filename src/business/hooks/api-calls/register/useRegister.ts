import { Mediator } from '@Mediatr/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RegisterCommand } from 'business/application/shaparak/register/command';
import { pushAlert } from 'business/stores/AppAlertsStore';

import { ErrorType } from 'common/entities/ErrorType';
import { RegisterResponse } from 'common/entities/http-dtos/register/response';

const mediator = new Mediator();

export function useRegister() {
	const queryClient = useQueryClient();

	return useMutation<RegisterResponse, ErrorType<object>>({
		mutationFn: () => mediator.send<RegisterResponse>(new RegisterCommand()),
		mutationKey: ['register'],
		onMutate: (variables) => {
			return () => variables;
		},
		onSuccess: (res) => {
			const url = res.registrationAddress.replace('tsm.shaparak.ir', '10.42.7.39');
			window.open(url, '_blank');
			queryClient.setQueryData(['register'], (_oldData: RegisterResponse | undefined) => res);
			return res;
		},
		onError: (err) => {
			pushAlert({
				type: 'error',
				messageText: err.detail,
				hasConfirmAction: true
			});
		}
	});
}
