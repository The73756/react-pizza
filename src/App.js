import { useState, useEffect } from 'react';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import Pizza from './components/Pizza';

import './scss/app.scss';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      fetch('https://62dfc893976ae7460bf39a43.mockapi.io/items')
        .then((res) => res.json())
        .then((json) => setItems(json));
    } catch (error) {
      alert('Ошибка при загрузке приложения!');
      console.error(error);
    }
  }, []);

  return (
    <div className='App'>
      <div className='wrapper'>
        <Header />
        <div className='content'>
          <div className='container'>
            <div className='content__top'>
              <Categories />
              <Sort />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>
              {items.map((item) => (
                <Pizza key={item.id} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
