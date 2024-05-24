import { useParams } from 'react-router';
import styles from './ItemDetails.module.css';
import { useState } from 'react';
import Loading from '../utils/Loading';
import { useGetItemDetailsQuery } from '../state/item/api';
import SelectColor from '../components/ItemDetails/SelectColor';
import SelectImage from '../components/ItemDetails/SelectImage';
import SelectSize from '../components/ItemDetails/SelectSize';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../state/item';
import { BsFillCartPlusFill, BsFillCartDashFill } from 'react-icons/bs';

const ItemDetails = () => {
  const { id } = useParams();
  const { data: itemData, isLoading } = useGetItemDetailsQuery(id);
  const [colorId, setColorId] = useState(0);
  const [sizeId, setSizeId] = useState(0);
  const { cartItemIds } = useSelector((state) => state.itemSlice);
  const dispatch = useDispatch();

  if (isLoading) return <Loading />;

  return (
    <div className={styles['item-details-page']}>
      <div className={styles.left}>
        <SelectImage images={itemData.images} />
      </div>
      <div className={styles.right}>
        <div className={styles.info}>
          <div>
            <p>{itemData.name}</p>
            <p>{itemData.price} UAH</p>
          </div>
          <SelectColor
            colors={itemData.colors}
            selectedId={colorId}
            onChange={(e) => setColorId(+e.target.id)}
          />
          <SelectSize
            sizes={itemData.sizes.filter(
              (size) => size.color.color === itemData.colors[colorId].color,
            )}
            selectedId={sizeId}
            onChange={(e) => setSizeId(+e.target.id)}
          />
          <div className={styles.buttons}>
            {cartItemIds.includes(itemData.sizes[sizeId].id) ? (
              <BsFillCartDashFill
                onClick={() =>
                  dispatch(removeFromCart(itemData.sizes[sizeId].id))
                }
                size={'40px'}
              />
            ) : (
              <BsFillCartPlusFill
                onClick={() => dispatch(addToCart({ itemData, sizeId }))}
                size={'40px'}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemDetails;
