export type GetDestinationCardsResponse = {
	datas: Card[];
};

type Card = {
	value: string;
	title: string;
	counter: number;
};
