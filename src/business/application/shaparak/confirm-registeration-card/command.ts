import { IRequest } from '@Mediatr/index';
import { ConfirmRegisterResponse } from 'common/entities/http-dtos/confirm-registration-card/response';

export class ConfirmRegisterCommand implements IRequest<ConfirmRegisterResponse> {
	transactionId: string;

	constructor(input: ConfirmRegisterCommand) {
		this.transactionId = input.transactionId;
	}
}
