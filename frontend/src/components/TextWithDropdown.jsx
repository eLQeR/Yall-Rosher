import { useState } from 'react';
import styles from './TextWithDropdown.module.css';
import { Link } from 'react-router-dom';
import { object, string } from 'prop-types';

const TextWithDropdown = ({ name, data }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <span
      className={styles.text}
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}>
      {name}
      {showDropdown ? (
        <div className={styles.dropdown}>
          <div className={styles.wrapper}>
            {Object.keys(data).map((type) => (
              <div key={`${name}-${type}`} className={styles.column}>
                <p className={styles.title}>{type}</p>
                <ul>
                  {data[type].map((semiCategory) => (
                    <li key={semiCategory.id}>
                      <Link to={`/items/${semiCategory.id}`}>
                        {semiCategory.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ''
      )}
    </span>
  );
};

TextWithDropdown.propTypes = {
  name: string,
  data: object,
};

export default TextWithDropdown;
