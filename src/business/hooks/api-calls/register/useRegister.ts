import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import { RegisterCommand } from 'business/application/shaparak/register/command';

import { ErrorType } from 'common/entities/ErrorType';
import { RegisterResponse } from 'common/entities/http-dtos/register/response';

const mediator = new Mediator();

export function useRegister() {
	return useMutation<RegisterResponse, ErrorType<object>, RegisterCommand>({
		mutationFn: () => mediator.send<RegisterResponse>(new RegisterCommand()),
		onMutate: (variables) => {
			return () => variables;
		},
		onSuccess: (data) => {
			return () => data;
		},
		onError: (_, variables) => {
			return () => variables;
		}
	});
}
