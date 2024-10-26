import { IRequest } from '@Mediatr/index';
import { GetCardsListResponse } from 'common/entities/httpDtos/getCardsList/response';

export default class GetCardsListQuery implements IRequest<GetCardsListResponse> {}
