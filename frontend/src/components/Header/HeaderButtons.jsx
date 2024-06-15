import IconWithLink from '../IconWithLink';
import { GrLogin } from 'react-icons/gr';
import { logout } from '../../state/user';
import { GrLogout } from 'react-icons/gr';
import { CgProfile } from 'react-icons/cg';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Header.module.css';
import { useState } from 'react';
import Modal from '../../utils/Modal';

export default function HeaderButtons() {
  const [modalOpened, setModalOpened] = useState(false);
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  return (
    <div className={styles.buttons}>
      {modalOpened && (
        <Modal
          title='Ви впевнені?'
          onProceed={() => dispatch(logout())}
          onClose={() => setModalOpened(false)}
        />
      )}
      {!user ? (
        <IconWithLink Icon={GrLogin} to='/login' label='Увійти' />
      ) : (
        <>
          <IconWithLink Icon={CgProfile} to={'/profile'} label='Кабінка' />
          <IconWithLink
            Icon={GrLogout}
            action={() => setModalOpened(true)}
            label='Вийти'
          />
        </>
      )}
      <IconWithLink Icon={FaShoppingCart} to='/cart' label='Кошик' />
    </div>
  );
}
