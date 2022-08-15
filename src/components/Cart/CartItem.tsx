import { useDispatch } from 'react-redux';
import { plusItem, minusItem } from '../../redux/cart/slice';

import styles from './Cart.module.scss';

type CartItemProps = {
  id: string;
  title: string;
  type: string;
  size: number;
  price: number;
  imageUrl: string;
  count: number;
};

export const CartItem: React.FC<CartItemProps> = ({
  id,
  title,
  type,
  size,
  price,
  imageUrl,
  count,
}) => {
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(
      plusItem({
        id,
        size,
        type,
        title,
        price,
        imageUrl,
        count,
      }),
    );
  };

  const onClickMinus = () => {
    dispatch(minusItem({ id, size, type, title, price, imageUrl, count }));
  };

  const onClickRemove = () => {
    dispatch(minusItem({ id, size, type, title, price, imageUrl, count, isFullRemove: true }));
  };

  return (
    <article className={styles.item}>
      <div className={styles.itemImg}>
        <img src={imageUrl} alt='Pizza' width={80} height={80} />
      </div>
      <div className={styles.itemInfo}>
        <h3>{title}</h3>
        <p>
          {type}, {size} см.
        </p>
      </div>
      <div className={styles.itemCount}>
        <button
          className={`button button--outline button--circle ${styles.itemCountMinus}`}
          onClick={onClickMinus}>
          <svg
            width='10'
            height='10'
            viewBox='0 0 10 10'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z'
              fill='#EB5A1E'
            />
            <path
              d='M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z'
              fill='#EB5A1E'
            />
          </svg>
        </button>
        <b>{count}</b>
        <button className={`button button--outline button--circle`} onClick={onClickPlus}>
          <svg
            width='10'
            height='10'
            viewBox='0 0 10 10'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z'
              fill='#EB5A1E'
            />
            <path
              d='M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z'
              fill='#EB5A1E'
            />
          </svg>
        </button>
      </div>
      <div className={styles.itemPrice}>
        <b>{price * count} ₽</b>
        <div>
          <button className='button button--outline button--circle' onClick={onClickRemove}>
            <svg
              style={{ transform: 'rotate(45deg)' }}
              width='10'
              height='10'
              viewBox='0 0 10 10'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z'
                fill='#EB5A1E'
              />
              <path
                d='M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z'
                fill='#EB5A1E'
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
};
