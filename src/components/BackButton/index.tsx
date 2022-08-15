import { Link } from 'react-router-dom';

import styles from './BackHomeButton.module.scss';

const BackHomeButton: React.FC = () => {
  return (
    <Link to='/' className={`button ${styles.backButton}`}>
      На главную
    </Link>
  );
};

export default BackHomeButton;
