import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import Pizza from './components/Pizza';

function App() {
  return (
    <div className='App'>
      <div className='wrapper'>
        <div className='content'>
          <Header />
          <div className='container'>
            <div className='content__top'>
              <Categories />
              <Sort />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>
              <Pizza />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
