export type GetKeyResponse = {
	transactionId: string;
	keyData: string;
	status: string;
	keySpec: string;
};

export type GetKeyError = {
	transactionId: string;
	errors: string;
	status: string;
};
