import { Mediator } from '@Mediatr/index';
import { useQuery } from '@tanstack/react-query';
import GetDestinationCardsQuery from 'business/application/shaparak/get-destination-cards/Query';

import { ErrorType } from 'common/entities/ErrorType';
import { GetDestinationCardsResponse } from 'common/entities/http-dtos/get-destination-cards/response';

const mediator = new Mediator();

export function useGetDestinationCards() {
	return useQuery<GetDestinationCardsResponse, ErrorType<object>, GetDestinationCardsResponse>({
		queryKey: ['DestinationCardsList'],
		queryFn: () => mediator.send<GetDestinationCardsResponse>(new GetDestinationCardsQuery()),
		staleTime: 5 * 60 * 1000,
		retry: false
	});
}
