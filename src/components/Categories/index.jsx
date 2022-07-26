import { useState } from 'react';
import styles from './Categories.module.scss';

export default function Categories() {

  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleClickCategory = (e) => {
    if (e.target && e.target.nodeName === 'LI') {
      setActiveIndex(+e.target.id);
    }
  }

  return (
    <div className={styles.categories}>
      <ul onClick={handleClickCategory}>
        {
          categories.map((category, index) => (
            <li key={index} id={index} className={activeIndex === index ? styles.active : ''}>
              {category}
            </li>
          ))
          }  
      </ul>
    </div>
  );
}
