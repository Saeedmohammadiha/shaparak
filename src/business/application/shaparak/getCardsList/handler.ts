import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { getCardsList } from 'business/infrastructure/end-points';
import { GetCardsListResponse } from 'common/entities/httpDtos/getCardsList/response';
import GetCardsListQuery from './query';

@requestHandler(GetCardsListQuery)
export class GetCardsListHandler implements IRequestHandler<GetCardsListQuery, GetCardsListResponse> {
	handle(): Promise<GetCardsListResponse> {
		const apiClient = new APIClient<null, GetCardsListResponse>(getCardsList);
		return apiClient.getAll({});
	}
}
