import { array, func, number } from 'prop-types';
import styles from './styles.module.css';

export default function SelectColor({ selectedId, colors, onChange }) {
  return (
    <div className={styles.colors}>
      <p>Колір - {colors[selectedId].color}</p>
      <div className={styles['color-boxes']}>
        {colors.map((color, index) => (
          <div key={index} className={styles.color}>
            <div className={`${styles['color-box']} hoverable`}>
              <div
                id={index}
                style={{
                  width: '30px',
                  height: '30px',
                  background: color.hex,
                  borderRadius: '50%',
                }}
                onClick={onChange}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

SelectColor.propTypes = {
  colors: array,
  selectedId: number,
  onChange: func,
};
