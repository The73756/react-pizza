import styles from './Categories.module.scss';

export default function Categories({ value, onChangeCategory }) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className={styles.categories}>
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className={value === index ? styles.active : ''}
            onClick={() => onChangeCategory(index)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
