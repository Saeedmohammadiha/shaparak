export type GetCardsListResponse = CardItem[];

type CardItem = {
	cardIndex: number;
	maskedPan: string;
};
