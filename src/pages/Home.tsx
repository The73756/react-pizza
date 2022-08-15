import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../redux/store';

import { Pizza, Skeleton, Categories, NotFoundBlock, Pagination, Sort } from '../components';

import { selectFilter, selectSearchValue } from '../redux/filter/selectors';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { selectPizzaData } from '../redux/pizza/selectors';

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
        <NotFoundBlock isSearch />
      ) : status !== 'error' ? (
        <Pagination currentPage={currentPage} onChangePage={сhangePage} items={countItems} />
      ) : (
        ''
      )}
    </>
  );
};

export default Home;
