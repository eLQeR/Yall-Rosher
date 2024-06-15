import { array, func, number } from 'prop-types';
import styles from './styles.module.css';

export default function SelectSize({ selectedId, sizes, onChange }) {
  return (
    <div className={styles.sizes}>
      {sizes.length !== 0 ? (
        <>
          {selectedId !== null && <p>Розмір - {sizes[selectedId].size}</p>}
          <div className={styles['sizes-box']}>
            {sizes.map((size, index) => (
              <div
                style={{
                  border: '1px solid black',
                  borderRadius: '10px',
                  width: '55px',
                  height: '35px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:
                    index === selectedId
                      ? '#008B8B'
                      : sizes[index].quantity < 1 && 'grey',
                }}
                key={index}
                onClick={() => {
                  if (index !== selectedId && sizes[index].quantity > 0)
                    onChange(index, size.id);
                }}>
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
