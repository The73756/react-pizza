import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Preloader } from './components';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';

import './scss/app.scss';

const Cart = lazy(() => import('./pages/Cart'));
const NotFound = lazy(() => import('./pages/NotFound'));
const PizzaFrame = lazy(() => import('./pages/PizzaFrame'));

function App() {
  return (
    <Routes>
      <Route path={process.env.PUBLIC_URL + '/'} element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route
          path={process.env.PUBLIC_URL + '/cart'}
          element={
            <Suspense fallback={<Preloader />}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path={process.env.PUBLIC_URL + '/pizza/:id'}
          element={
            <Suspense fallback={<Preloader />}>
              <PizzaFrame />
            </Suspense>
          }
        />
        <Route
          path={process.env.PUBLIC_URL + '/*'}
          element={
            <Suspense fallback={<Preloader />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
