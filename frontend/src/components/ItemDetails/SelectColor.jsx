import { array, func, number } from 'prop-types';
import styles from './styles.module.css';

export default function SelectColor({ selectedId, colors, onChange }) {
  return (
    <div className={styles.colors}>
      {selectedId !== null && <p>Колір - {colors[selectedId].color}</p>}
      <div className={styles['color-boxes']}>
        {colors.map((color, index) => (
          <div key={index} className={styles.color}>
            <div
              style={{
                border:
                  index === selectedId
                    ? '3px solid #008B8B'
                    : '1px solid black',
                padding: '3px',
                borderRadius: '50%',
              }}>
              <div
                id={index}
                style={{
                  width: '30px',
                  height: '30px',
                  background: color.hex,
                  borderRadius: '50%',
                }}
                onClick={(e) => {
                  if (e.target.id !== selectedId) onChange(e);
                }}
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
