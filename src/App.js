import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';

import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import PizzaFrame from './pages/PizzaFrame';

import './scss/app.scss';

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <main className='content'>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='cart' element={<Cart />} />
            <Route path='pizza/:id' element={<PizzaFrame />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
