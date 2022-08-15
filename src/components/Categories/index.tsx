import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectSearchValue } from '../../redux/filter/selectors';

import styles from './Categories.module.scss';

type CategoriesProps = {
  value: number;
  onChangeCategory: (index: number) => void;
};

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC<CategoriesProps> = memo(({ value, onChangeCategory }) => {
  const searchValue = useSelector(selectSearchValue);
  return (
    <div className={styles.categories}>
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className={`${value === index ? styles.active : ''}${
              value !== index && searchValue ? styles.disabled : ''
            }`}
            onClick={!searchValue ? () => onChangeCategory(index) : undefined}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
