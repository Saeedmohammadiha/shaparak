import { Mediator } from '@Mediatr/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RegisterCommand } from 'business/application/shaparak/register/command';
import { pushAlert } from 'business/stores/AppAlertsStore';

import { ErrorType } from 'common/entities/ErrorType';
import { RegisterResponse } from 'common/entities/http-dtos/register/response';
import { Dispatch, SetStateAction } from 'react';

const mediator = new Mediator();

type Props = {
	open?: boolean;
	clearAlerts: () => void;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

export function useRegister({ setOpen, clearAlerts }: Props) {
	const queryClient = useQueryClient();

	const closeModal = () => {
		setOpen(false);
		clearAlerts();
	};

	return useMutation<RegisterResponse, ErrorType<object>>({
		mutationFn: () => mediator.send<RegisterResponse>(new RegisterCommand()),
		mutationKey: ['register'],
		onMutate: (variables) => {
			return () => variables;
		},
		onSuccess: (res) => {
			queryClient.setQueryData(['register'], (_oldData: RegisterResponse | undefined) => res);
			closeModal();
			const url = res.registrationAddress.replace('tsm.shaparak.ir', '10.42.7.39');
			window.open(url, '_blank');
		},
		onError: (err) => {
			console.log(err);
			closeModal();
			pushAlert({
				type: 'error',
				messageText: err.detail,
				hasConfirmAction: true
			});
		}
	});
}
