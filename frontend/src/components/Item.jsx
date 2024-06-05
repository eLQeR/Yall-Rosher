import { defaultItem } from '../consts/images';
import styles from './Item.module.css';
import { string, number } from 'prop-types';

const Item = ({ img, name, price }) => {
  return (
    <div className={`${styles.item} hoverable`}>
      <div className={styles.image}>
        <img src={img || defaultItem} />
      </div>
      <div className={styles.information}>
        <p className={styles.name}>{name}</p>
        <p className={styles.price}>{price} UAH</p>
      </div>
    </div>
  );
};

Item.propTypes = {
  img: string,
  name: string,
  price: number,
};

export default Item;
