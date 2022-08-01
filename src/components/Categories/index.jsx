import { useContext } from 'react';

import styles from './Categories.module.scss';
import { SearchContext } from '../../App';

export default function Categories({ value, onChangeCategory }) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const { searchValue } = useContext(SearchContext);

  return (
    <div className={styles.categories}>
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className={`${value === index ? styles.active : ''}${
              value !== index && searchValue ? styles.disabled : ''
            }`}
            onClick={!searchValue ? () => onChangeCategory(index) : null}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
