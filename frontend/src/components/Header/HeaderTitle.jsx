import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function HeaderTitle() {
  return (
    <Link to="/">
      <h1 className={`${styles.title} hoverable`}>YALL-ROSHER</h1>
    </Link>
  );
}
