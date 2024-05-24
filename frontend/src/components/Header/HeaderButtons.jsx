import IconWithLink from '../IconWithLink';
import { GrLogin } from 'react-icons/gr';
import { logout } from '../../state/user';
import { GrLogout } from 'react-icons/gr';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Header.module.css';

export default function HeaderButtons() {
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  return (
    <div className={styles.buttons}>
      {!user ? (
        <IconWithLink Icon={GrLogin} to="/login" label="Увійти" />
      ) : (
        <IconWithLink
          Icon={GrLogout}
          action={() => dispatch(logout())}
          label="Вийти"
        />
      )}
      <IconWithLink Icon={FaShoppingCart} to="/cart" label="Кошик" />
    </div>
  );
}
