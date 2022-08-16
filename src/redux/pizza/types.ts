export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export type fetchPizzasArgh = {
  category: string;
  search: string;
  currentPage: number;
  sortOrder: string;
  sortProperty: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: Pizza[];
  countItems: number;
  status: Status;
}