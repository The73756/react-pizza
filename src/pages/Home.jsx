import { React, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pizza from '../components/Pizza';
import Pagination from '../components/Pagination';
import { Skeleton } from '../components/Pizza/Skeleton';
import { SearchContext } from '../App';

export default function Home() {
  const dispatch = useDispatch();

  const { items, countItems, status } = useSelector((state) => state.pizza);
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const { searchValue, localSearchValue } = useContext(SearchContext);

  const changeCategory = (id) => {
    dispatch(setCategoryId(id));
    currentPage !== 1 && dispatch(setCurrentPage(1));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getItems = () => {
    const category = categoryId > 0 ? `&category=${categoryId}&` : '';
    const search = searchValue.trim() ? `&search=${searchValue.trim()}&` : '';
    const sortOrder = sort.order;
    const sortProperty = sort.sortProperty;

    if (searchValue !== '' && categoryId > 0) {
      changeCategory(0);
    }
    dispatch(
      fetchPizzas({
        category,
        search,
        currentPage,
        sortOrder,
        sortProperty,
      }),
    );
  };

  useEffect(() => {
    getItems();
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

      {status === 'error' ? (
        <div className='content__error'>
          <h2>Ошибка при загрузке данных 😕</h2>
          <p>Вероятнее всего, сайт сдох, попробуйте перезагрузить страницу или вернуться позже.</p>
        </div>
      ) : (
        <div className='content__items'>{status === 'loading' ? skeletons : elements}</div>
      )}

      {elements.length === 0 && status !== 'loading' && status !== 'error'
        ? 'Пиццы не найдены'
        : ''}

      {status !== 'error' && elements.length !== 0 ? (
        <Pagination currentPage={currentPage} onChangePage={onChangePage} items={countItems} />
      ) : (
        ''
      )}
    </>
  );
}
