import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';

import { GET_DESTINATION_CARDS } from 'business/infrastructure/end-points';
import { GetDestinationCardsResponse } from 'common/entities/http-dtos/get-destination-cards/response';
import GetDestinationCardsQuery from './Query';

@requestHandler(GetDestinationCardsQuery)
export class GetDestinationCardsHandler
	implements IRequestHandler<GetDestinationCardsQuery, GetDestinationCardsResponse>
{
	handle(): Promise<GetDestinationCardsResponse> {
		const apiClient = new APIClient<null, GetDestinationCardsResponse>(GET_DESTINATION_CARDS);
		return apiClient.getAll({});
	}
}
