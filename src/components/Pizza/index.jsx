import { useState } from 'react';
import styles from './Pizza.module.scss';
import { useSelector, useDispatch } from 'react-redux';

import { plusItem } from '../../redux/slices/cartSlice';

export default function Pizza({ id, title, price, imageUrl, sizes, types }) {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.items.find((item) => item.id === id));
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const addedCount = cartItem ? cartItem.count : 0;

  const typeNames = ['тонкое', 'традиционное'];

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
    };
    dispatch(plusItem(item));
  };

  return (
    <article className={styles.pizza}>
      <img className={styles.image} width={270} height={270} src={imageUrl} alt={title} />
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.selector}>
        <ul>
          {types.map((typeId, index) => (
            <li
              key={`${id}${index}`}
              className={activeType === index ? styles.active : ''}
              onClick={() => setActiveType(index)}>
              {typeNames[typeId]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              key={`${id}${index}`}
              className={activeSize === index ? styles.active : ''}
              onClick={() => setActiveSize(index)}>
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.bottom}>
        <div className={styles.price}>от {price} ₽</div>
        <button className='button button--outline button--add' onClick={onClickAdd}>
          <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
              fill='white'
            />
          </svg>
          <span>Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </article>
  );
}
