import { React, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { setItems, setCountItems } from '../redux/slices/pizzaSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pizza from '../components/Pizza';
import Pagination from '../components/Pagination';
import { Skeleton } from '../components/Pizza/Skeleton';
import { SearchContext } from '../App';

export default function Home() {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const { items, countItems } = useSelector((state) => state.pizza);

  const { searchValue, localSearchValue } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(true);

  const changeCategory = (id) => {
    dispatch(setCategoryId(id));
    currentPage !== 1 && dispatch(setCurrentPage(1));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchItems = async () => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}&` : '';
    const search = searchValue.trim() ? `&search=${searchValue.trim()}&` : '';

    if (searchValue !== '' && categoryId > 0) {
      changeCategory(0);
    }

    try {
      const { data } = await axios.get(
        `https://62dfc893976ae7460bf39a43.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort.sortProperty}&order=${sort.order}${search}`,
      );

      dispatch(setCountItems(data.count));
      dispatch(setItems(data.items));
    } catch (error) {
      alert('Ошибка при загрузке приложения!');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line
  }, [categoryId, sort, searchValue, currentPage]);

  const elements = items.map((item) => <Pizza key={item.id} {...item} />);
  const skeletons = [...new Array(4)].map((item, index) => <Skeleton key={index} />);

  return (
    <>
      <div className='content__top'>
        <Categories value={categoryId} onChangeCategory={changeCategory} />
        <Sort />
      </div>
      <h2 className='content__title'>
        {localSearchValue ? 'Поиск по: ' + localSearchValue : 'Все пиццы'}
      </h2>
      <div className='content__items'>{isLoading ? skeletons : elements}</div>
      {elements.length === 0 && !isLoading ? (
        'Пиццы не найдены'
      ) : (
        <Pagination currentPage={currentPage} onChangePage={onChangePage} items={countItems} />
      )}
    </>
  );
}
