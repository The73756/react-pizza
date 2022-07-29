import { React, useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pizza from '../components/Pizza';
import { Skeleton } from '../components/Pizza/Skeleton';
import Pagination from '../components/Pagination';

export default function Home({ searchValue }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [countItems, setCountItems] = useState(0);
  const [sortType, setSortType] = useState({
    id: 0,
    name: 'популярности',
    reverseIcon: true,
    sortProperty: 'rating',
    order: 'desc',
  });

  useEffect(() => {
    const category = categoryId > 0 ? `category=${categoryId}&` : '';
    const search = searchValue.trim() ? `&search=${searchValue.trim()}&` : '';

    if (searchValue !== '') {
      setCategoryId(0);
    }

    try {
      setIsLoading(true);
      fetch(
        `https://62dfc893976ae7460bf39a43.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType.sortProperty}&order=${sortType.order}${search}`,
      )
        .then((res) => res.json())
        .then((json) => {
          setCountItems(json.count);
          setItems(json.items);
          setIsLoading(false);
        });
    } catch (error) {
      alert('Ошибка при загрузке приложения!');
      console.error(error);
    }
  }, [categoryId, sortType, searchValue, currentPage]);

  const elements = items.map((item) => <Pizza key={item.id} {...item} />);
  const skeletons = [...new Array(4)].map((item, index) => <Skeleton key={index} />);

  return (
    <>
      <div className='content__top'>
        <Categories value={categoryId} onChangeCategory={setCategoryId} />
        <Sort value={sortType} onChangeSort={setSortType} />
      </div>
      <h2 className='content__title'>{searchValue ? 'Поиск по: ' + searchValue : 'Все пиццы'}</h2>
      <div className='content__items'>{isLoading ? skeletons : elements}</div>
      {elements.length === 0 && !isLoading ? (
        'Пиццы не найдены'
      ) : (
        <Pagination onChangePage={(number) => setCurrentPage(number)} items={countItems} />
      )}
    </>
  );
}
