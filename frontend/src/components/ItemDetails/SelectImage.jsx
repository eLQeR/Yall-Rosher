import { useState } from 'react';
import { array } from 'prop-types';
import styles from './styles.module.css';

export default function SelectImage({ images }) {
  const [bigPhotoId, setBigPhotoId] = useState(0);

  return (
    <div className={styles.images}>
      <div className={styles['image-chose']}>
        {images.map((image, index) => (
          <img
            className={`${styles['small-image']} hoverable`}
            id={index}
            key={index}
            src={image?.image}
            alt={`image ${index + 1}`}
            onClick={(e) => setBigPhotoId(e.target.id)}
          />
        ))}
      </div>
      <div className={styles['image-box']}>
        <img className={styles.image} src={images[bigPhotoId].image} />
      </div>
    </div>
  );
}

SelectImage.propTypes = {
  images: array,
};
