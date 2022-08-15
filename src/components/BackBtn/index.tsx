import { Link } from 'react-router-dom';

import styles from './BackBtn.module.scss';

export const BackBtn: React.FC = () => {
  return (
    <Link to='/' className={`button ${styles.BackBtn}`}>
      На главную
    </Link>
  );
};