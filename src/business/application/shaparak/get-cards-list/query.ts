import { IRequest } from '@Mediatr/index';
import { GetCardsListResponse } from 'common/entities/http-dtos/get-cards-list/response';

export default class GetCardsListQuery implements IRequest<GetCardsListResponse> {}
