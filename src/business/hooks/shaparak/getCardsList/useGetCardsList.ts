import { Mediator } from '@Mediatr/index';
import { useQuery } from '@tanstack/react-query';
import Query from 'business/application/shaparak/getCardsList/query';

import { ErrorType } from 'common/entities/ErrorType';
import { Response } from 'common/entities/httpDtos/getCardsList/response';

const mediator = new Mediator();

export function useGetCardsList() {
	return useQuery<Response, ErrorType<object>, Response>({
		queryKey: ['cardsList'],
		queryFn: () => mediator.send<Response>(new Query()),
		staleTime: 5 * 60 * 1000,
		retry: false
	});
}
