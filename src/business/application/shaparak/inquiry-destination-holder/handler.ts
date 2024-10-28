import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { INQUIRY_DESTINATION_HOLDER } from 'business/infrastructure/end-points';
import { InquiryDestinationResponse } from 'common/entities/http-dtos/inquiry-destination-holeder/response';
import { InquiryDestinationCommand } from './command';

@requestHandler(InquiryDestinationCommand)
export class InquiryDestinationHandler
	implements IRequestHandler<InquiryDestinationCommand, InquiryDestinationResponse>
{
	handle(value: InquiryDestinationCommand): Promise<InquiryDestinationResponse> {
		const apiClient = new APIClient<InquiryDestinationCommand, InquiryDestinationResponse>(
			INQUIRY_DESTINATION_HOLDER
		);
		return apiClient.post({
			amount: value.amount,
			cardIndex: value.cardIndex,
			destinationCardNo: value.destinationCardNo,
		});
	}
}
