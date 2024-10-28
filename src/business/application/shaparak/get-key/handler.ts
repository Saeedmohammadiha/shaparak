import { IRequestHandler, requestHandler } from '@Mediatr/index';
import APIClient from 'business/infrastructure/api-client';
import { GET_KEY } from 'business/infrastructure/end-points';
import useInitialSettingStore from 'business/stores/initial-setting-store';
import { GetKeyResponse } from 'common/entities/http-dtos/get-key/response';
import { GetKeyCommand } from './command';

@requestHandler(GetKeyCommand)
export class GetKeyHandler implements IRequestHandler<GetKeyCommand, GetKeyResponse> {
	handle(value: GetKeyCommand): Promise<GetKeyResponse> {
		const { settings } = useInitialSettingStore.getState();
		const apiClient = new APIClient<GetKeyCommand, GetKeyResponse>(GET_KEY, settings.shaparakBaseUrl as string);
		return apiClient.post({
			transactionId: value.transactionId,
			keyId: value.keyId
		});
	}
}
