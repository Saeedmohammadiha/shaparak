import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import { ConfirmRegisterCommand } from 'business/application/shaparak/confirm-registeration-card/command';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { ErrorType } from 'common/entities/ErrorType';
import { ConfirmRegisterRequest } from 'common/entities/http-dtos/confirm-registration-card/request';
import { ConfirmRegisterResponse } from 'common/entities/http-dtos/confirm-registration-card/response';

const mediator = new Mediator();

export function useConfirm() {
	return useMutation<ConfirmRegisterResponse, ErrorType<ConfirmRegisterRequest>, ConfirmRegisterRequest>({
		mutationFn: (data: ConfirmRegisterCommand) =>
			mediator.send<ConfirmRegisterResponse>(new ConfirmRegisterCommand(data)),
		mutationKey: ['confirm-register'],
		onMutate: (variables) => {
			return () => variables;
		},
		onSuccess: (res) => {
			console.log(res);
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
