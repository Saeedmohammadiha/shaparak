import { IRequest } from '@Mediatr/index';
import { GetKeyResponse } from 'common/entities/http-dtos/get-key/response';

export class GetKeyCommand implements IRequest<GetKeyResponse> {
	transactionId: string;
	keyId: string;

	constructor(input: GetKeyCommand) {
		this.transactionId = input.transactionId;
		this.keyId = input.keyId;
	}
}
