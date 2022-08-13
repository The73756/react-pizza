import { useSelector } from 'react-redux';
import { selectSearchValue } from '../../redux/slices/filterSlice';

import styles from './Categories.module.scss';

type CategoriesProps = {
  value: number;
  onChangeCategory: Function;
};

const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {
  const searchValue = useSelector(selectSearchValue);
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

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
};

export default Categories;
