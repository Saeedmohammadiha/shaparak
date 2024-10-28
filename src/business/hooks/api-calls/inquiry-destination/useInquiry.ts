import { Mediator } from '@Mediatr/index';
import { useMutation } from '@tanstack/react-query';
import { InquiryDestinationCommand } from 'business/application/shaparak/inquiry-destination-holder/command';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { ErrorType } from 'common/entities/ErrorType';
import { InquiryDestinationRequest } from 'common/entities/http-dtos/inquiry-destination-holeder/request';
import { InquiryDestinationResponse } from 'common/entities/http-dtos/inquiry-destination-holeder/response';

const mediator = new Mediator();

export function useInquiry() {
	return useMutation<InquiryDestinationResponse, ErrorType<InquiryDestinationRequest>, InquiryDestinationRequest>({
		mutationFn: (data: InquiryDestinationCommand) =>
			mediator.send<InquiryDestinationResponse>(new InquiryDestinationCommand(data)),
		mutationKey: ['inquiry-destination'],
		cacheTime: 10 * 60 * 1000,
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
