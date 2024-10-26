import { IRequest } from '@Mediatr/index';
import { RegisterResponse } from 'common/entities/http-dtos/register/response';

export class RegisterCommand implements IRequest<RegisterResponse> {}
