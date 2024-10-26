import { Mediator } from '@Mediatr/index';
import { useQuery } from '@tanstack/react-query';
import GetCardsListQuery from 'business/application/shaparak/get-cards-list/query';

import { ErrorType } from 'common/entities/ErrorType';
import { GetCardsListResponse } from 'common/entities/http-dtos/get-cards-list/response';

const mediator = new Mediator();

export function useGetCardsList() {
	return useQuery<GetCardsListResponse, ErrorType<object>, GetCardsListResponse>({
		queryKey: ['cardsList'],
		queryFn: () => mediator.send<GetCardsListResponse>(new GetCardsListQuery()),
		staleTime: 5 * 60 * 1000,
		retry: false
	});
}
