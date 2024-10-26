import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';

import { getDestinationCards } from 'business/infrastructure/end-points';
import { GetDestinationCardsResponse } from 'common/entities/httpDtos/getDestinationCards/response';
import GetDestinationCardsQuery from './Query';

@requestHandler(GetDestinationCardsQuery)
export class GetDestinationCardsHandler
	implements IRequestHandler<GetDestinationCardsQuery, GetDestinationCardsResponse>
{
	handle(): Promise<GetDestinationCardsResponse> {
		const apiClient = new APIClient<null, GetDestinationCardsResponse>(getDestinationCards);
		return apiClient.getAll({});
	}
}
