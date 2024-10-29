import { IRequest } from '@Mediatr/index';
import { InquiryDestinationResponse } from 'common/entities/http-dtos/inquiry-destination-holeder/response';

export class InquiryDestinationCommand implements IRequest<InquiryDestinationResponse> {
	cardIndex: number;
	destinationCardNo: number;
	amount: number;
	description: string;

	constructor(input: InquiryDestinationCommand) {
		this.cardIndex = input.cardIndex;
		this.destinationCardNo = input.destinationCardNo;
		this.amount = input.amount;
		this.description = input.description;
	}
}
