import { Mediator } from '@Mediatr/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InquiryDestinationCommand } from 'business/application/shaparak/inquiry-destination-holder/command';
import { pushAlert } from 'business/stores/AppAlertsStore';
import { ErrorType } from 'common/entities/ErrorType';
import { InquiryDestinationRequest } from 'common/entities/http-dtos/inquiry-destination-holeder/request';
import { InquiryDestinationResponse } from 'common/entities/http-dtos/inquiry-destination-holeder/response';
import { useNavigate } from 'react-router-dom';
import { paths } from 'ui/route-config/paths';

const mediator = new Mediator();

export function useInquiry() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation<InquiryDestinationResponse, ErrorType<InquiryDestinationRequest>, InquiryDestinationRequest>({
		mutationFn: (data: InquiryDestinationCommand) =>
			mediator.send<InquiryDestinationResponse>(new InquiryDestinationCommand(data)),
		mutationKey: ['inquiry-destination'],
		cacheTime: 10 * 60 * 1000,
		onMutate: (variables) => {
			return () => variables;
		},
		onSuccess: (res) => {
			queryClient.setQueryData(
				['inquiry-destination'],
				(_oldData: InquiryDestinationResponse | undefined) => res
			);
			navigate(paths.Overview);
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
