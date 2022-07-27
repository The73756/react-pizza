import { React, useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pizza from '../components/Pizza';
import { Skeleton } from '../components/Pizza/Skeleton';

export default function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      fetch('https://62dfc893976ae7460bf39a43.mockapi.io/items')
        .then((res) => res.json())
        .then((json) => {
          setItems(json);
          setIsLoading(false);
        });
    } catch (error) {
      alert('Ошибка при загрузке приложения!');
      console.error(error);
    }
  }, []);
  return (
    <>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading
          ? [...new Array(4)].map((item, index) => <Skeleton key={index} />)
          : items.map((item) => <Pizza key={item.id} {...item} />)}
      </div>
    </>
  );
}
