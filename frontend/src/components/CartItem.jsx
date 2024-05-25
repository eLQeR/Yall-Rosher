import { BsFillCartDashFill } from 'react-icons/bs';
import IconWithLink from './IconWithLink';
import { defaultItem } from '../consts/images';
import styles from './Item.module.css';
import { string, number } from 'prop-types';
import { removeFromCart } from '../state/item';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function CartItem({
  variantId,
  itemId,
  img,
  price,
  color,
  size,
}) {
  const dispatch = useDispatch();

  return (
    <div className={`${styles.item}`}>
      <div className={styles.image}>
        <Link to={`/item/${itemId}`}>
          <img src={img || defaultItem} />
        </Link>
      </div>
      <div className={styles.information}>
        <p className={styles.price}>
          {price}, Колір - {color}, Розмір - {size}
        </p>
        <IconWithLink
          Icon={BsFillCartDashFill}
          action={() => dispatch(removeFromCart(variantId))}
        />
      </div>
    </div>
  );
}

CartItem.propTypes = {
  img: string,
  name: string,
  price: number,
  color: string,
  size: string,
  itemId: number,
  variantId: number,
};
