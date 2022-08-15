import { Sort } from '../redux/filter/types';

export const getSortFromLS = () => {
  const data = localStorage.getItem('sort');
  const sort = data
    ? JSON.parse(data)
    : { id: 0, name: 'популярности', reverseIcon: true, sortProperty: 'rating', order: 'desc' };
  return sort as Sort;
};
