import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { REGISTER } from 'business/infrastructure/end-points';
import { RegisterResponse } from 'common/entities/http-dtos/register/response';
import { RegisterCommand } from './command';

@requestHandler(RegisterCommand)
export class RegisterHandler implements IRequestHandler<RegisterCommand, RegisterResponse> {
	handle(): Promise<RegisterResponse> {
		const apiClient = new APIClient<null, RegisterResponse>(REGISTER);
		return apiClient.post(null);
	}
}
