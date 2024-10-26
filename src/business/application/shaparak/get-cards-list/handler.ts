import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { GET_CARDS_LIST } from 'business/infrastructure/end-points';
import { GetCardsListResponse } from 'common/entities/http-dtos/get-cards-list/response';
import GetCardsListQuery from './query';

@requestHandler(GetCardsListQuery)
export class GetCardsListHandler implements IRequestHandler<GetCardsListQuery, GetCardsListResponse> {
	handle(): Promise<GetCardsListResponse> {
		const apiClient = new APIClient<null, GetCardsListResponse>(GET_CARDS_LIST);
		return apiClient.getAll({});
	}
}
