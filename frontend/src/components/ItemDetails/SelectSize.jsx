import { array, func, number } from 'prop-types';
import styles from './styles.module.css';

export default function SelectSize({ selectedId, sizes, onChange }) {
  return (
    <div className={styles.sizes}>
      {sizes.length !== 0 ? (
        <>
          <p>Розмір - {sizes[selectedId].size}</p>
          <div className={styles['sizes-box']}>
            {sizes.map((size, index) => (
              <div
                id={index}
                className={`${styles.size} hoverable`}
                key={index}
                onClick={onChange}>
                {size.size}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Наразі на складі немає товару такого кольору</p>
      )}
    </div>
  );
}

SelectSize.propTypes = {
  sizes: array,
  onChange: func,
  selectedId: number,
};
