import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  selectFilter,
  selectSearchValue,
  setCategoryId,
  setCurrentPage,
} from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import Pizza from '../components/Pizza';
import Skeleton from '../components/Pizza/Skeleton';
import Sort from '../components/Sort';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { items, countItems, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage } = useSelector(selectFilter);
  const searchValue = useSelector(selectSearchValue);

  const changeCategory = useCallback((index: number) => {
    dispatch(setCategoryId(index));
    currentPage !== 1 && dispatch(setCurrentPage(1));
  }, []);

  const сhangePage = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const getItems = () => {
    const category = categoryId > 0 ? `&category=${categoryId}&` : '';
    const search = searchValue.trim() ? `&search=${searchValue.trim()}&` : '';
    const sortOrder = sort.order;
    const sortProperty = sort.sortProperty;

    if (searchValue !== '' && categoryId > 0) {
      changeCategory(0);
    }
    // эти две штуки отправляют лишний запрос.
    if (searchValue !== '') {
      сhangePage(1);
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
        <Sort value={sort} />
      </div>
      <h2 className='content__title'>{searchValue ? 'Поиск по: ' + searchValue : 'Все пиццы'}</h2>

      {status === 'error' ? (
        <div className='content__error'>
          <h2>Ошибка при загрузке данных 😕</h2>
          <p>Вероятнее всего, сайт сдох, попробуйте перезагрузить страницу или вернуться позже.</p>
        </div>
      ) : (
        <div className='content__items'>{status === 'loading' ? skeletons : elements}</div>
      )}

      {elements.length === 0 && status === 'success' ? (
        'Пиццы не найдены' // поиск не дал результатов
      ) : status !== 'error' ? (
        <Pagination currentPage={currentPage} onChangePage={сhangePage} items={countItems} />
      ) : (
        ''
      )}
    </>
  );
};

export default Home;
