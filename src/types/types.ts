export type Card = {
  id: number;
  title: string;
  description: string;
};
export type List = {
  id: number;
  title: string;
  cards: Card[];
};
