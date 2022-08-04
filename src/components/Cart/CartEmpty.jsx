import { Link } from 'react-router-dom';

import styles from './Cart.module.scss';

export default function CartEmpty() {
  return (
    <div className={styles.cartEmpty}>
      <h2>Корзина пуста 😕</h2>
      <p>
        Вероятней всего, вы не заказывали ещё пиццу.
        <br />
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <img src='/img/empty-cart.png' alt='' aria-hidden='true' />
      <Link to='/' className={`button ${styles.buttonBlack}`}>
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
}
