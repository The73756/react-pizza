import { useState } from 'react';
import styles from './Pizza.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectCartItemById, plusItem } from '../../redux/slices/cartSlice';

type PizzaProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  isFrame: boolean;
};

const Pizza: React.FC<PizzaProps> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
  isFrame = false,
}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const addedCount = cartItem.reduce((sum: number, item: any) => sum + item.count, 0);

  const typeNames = ['тонкое', 'традиционное'];
  const typеFactors = [1, 1.25];
  const sizeFactors = [1, 1.2, 1.6];

  const item = {
    id,
    title,
    price: Math.round(price * typеFactors[activeType] * sizeFactors[activeSize]),
    imageUrl,
    type: typeNames[activeType],
    typeFactor: typеFactors[activeType],
    size: sizes[activeSize],
    sizeFactor: sizeFactors[activeSize],
  };

  const onClickAdd = () => {
    dispatch(plusItem(item));
  };

  if (!isFrame) {
    return (
      <article className={styles.pizza}>
        <Link to={`pizza/${id}`}>
          <img className={styles.image} width={270} height={270} src={imageUrl} alt={title} />
          <h4 className={styles.title}>{title}</h4>
        </Link>
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
          <div className={styles.price}>от {item.price} ₽</div>
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
  } else {
    return (
      <article className={styles.pizzaFrame}>
        <div className={styles.left}>
          <img className={styles.image} width={270} height={270} src={imageUrl} alt={title} />
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
            <div className={styles.price}>от {item.price} ₽</div>
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
        </div>
        <div className={styles.right}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.descr}>
            Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты.
            Свой даль рекламных, рыбного запятой букв сбить коварный выйти повстречался?
          </p>
          <Link to='/' className={`button ${styles.buttonBack}`}>
            <span>Вернуться назад</span>
          </Link>
        </div>
      </article>
    );
  }
};

export default Pizza;
