export type Sort = {
  id: number;
  name: string;
  reverseIcon: boolean;
  sortProperty: 'rating' | 'title' | 'price';
  order: 'desc' | 'asc';
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: Sort;
}
