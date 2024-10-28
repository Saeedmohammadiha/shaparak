import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { CONFIRM_REGISTRATION_CARD } from 'business/infrastructure/end-points';
import { ConfirmRegisterResponse } from 'common/entities/http-dtos/confirm-registration-card/response';
import { ConfirmRegisterCommand } from './command';

@requestHandler(ConfirmRegisterCommand)
export class ConfirmRegisterHandler implements IRequestHandler<ConfirmRegisterCommand, ConfirmRegisterResponse> {
	handle(value: ConfirmRegisterCommand): Promise<ConfirmRegisterResponse> {
		const apiClient = new APIClient<ConfirmRegisterCommand, ConfirmRegisterResponse>(CONFIRM_REGISTRATION_CARD);
		return apiClient.post({
			transactionId: value.transactionId
		});
	}
}
