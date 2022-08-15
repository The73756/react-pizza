import { Outlet } from 'react-router-dom';

import { Header } from '../components';

const MainLayout: React.FC = () => {
  return (
    <div className='wrapper'>
      <Header />
      <main className='content'>
        <div className='container'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
