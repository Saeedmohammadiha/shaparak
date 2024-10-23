import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { getCardsList } from 'business/infrastructure/end-points';
import { Response } from 'common/entities/httpDtos/getCardsList/response';
import Query from './query';

@requestHandler(Query)
export class Handler implements IRequestHandler<Query, Response> {
	handle(): Promise<Response> {
		const apiClient = new APIClient<null, Response>(getCardsList);
		return apiClient.getAll({});
	}
}
