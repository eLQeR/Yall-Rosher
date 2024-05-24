import { useSelector } from 'react-redux';
import styles from './Items.module.css';
import { Navigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import CartSubmitForm from '../components/CartSubmitForm';

const Cart = () => {
  const { cartItems } = useSelector((state) => state.itemSlice);
  const { user } = useSelector((state) => state.userSlice);

  if (!user) return <Navigate to="/login" />;

  if (!cartItems || cartItems.length === 0)
    return (
      <div className="centered-container">
        <input
          readOnly
          value="Cart is currently empty"
          className="stylish-text-field"
        />
      </div>
    );

  return (
    <div className={styles['items-page']}>
      <CartSubmitForm />
      <div className={styles.items}>
        {cartItems.map((item) => (
          <div key={item.item.id}>
            <CartItem
              id={item.item.id}
              itemId={item.id}
              img={item.image}
              size={item.item.size}
              color={item.item.color.color}
              price={+item.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
