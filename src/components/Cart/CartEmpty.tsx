import styles from './Cart.module.scss';

import cartEmpty from '../../assets/img/empty-cart.png';
import BackBtn from '../BackBtn';

const CartEmpty: React.FC = () => {
  return (
    <>
      <div className={styles.cartEmpty}>
        <h2>Корзина пуста 😕</h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={cartEmpty} alt='' aria-hidden='true' />
        <BackBtn />
      </div>
    </>
  );
};

export default CartEmpty;
