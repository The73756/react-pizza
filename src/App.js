import { useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

import './scss/app.scss';

export const SearchContext = createContext('');

function App() {
  const [localSearchValue, setLocalSearchValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  return (
    <SearchContext.Provider
      value={{ searchValue, setSearchValue, localSearchValue, setLocalSearchValue }}>
      <div className='wrapper'>
        <Header />
        <main className='content'>
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='cart' element={<Cart />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </main>
      </div>
    </SearchContext.Provider>
  );
}

export default App;
