import { React, useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pizza from '../components/Pizza';
import Pagination from '../components/Pagination';
import { Skeleton } from '../components/Pizza/Skeleton';
import { SearchContext } from '../App';

export default function Home() {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filter);

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [countItems, setCountItems] = useState(0);

  const changeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    const category = categoryId > 0 ? `category=${categoryId}&` : '';
    const search = searchValue.trim() ? `&search=${searchValue.trim()}&` : '';

    if (searchValue !== '' && categoryId > 0) {
      changeCategory(0);
    }

    try {
      setIsLoading(true);
      fetch(
        `https://62dfc893976ae7460bf39a43.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort.sortProperty}&order=${sort.order}${search}`,
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
  }, [categoryId, sort, searchValue, currentPage]);

  const elements = items.map((item) => <Pizza key={item.id} {...item} />);
  const skeletons = [...new Array(4)].map((item, index) => <Skeleton key={index} />);

  return (
    <>
      <div className='content__top'>
        <Categories value={categoryId} onChangeCategory={changeCategory} />
        <Sort />
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
