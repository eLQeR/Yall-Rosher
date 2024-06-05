import { FaMagnifyingGlass } from 'react-icons/fa6';
import styles from './Header.module.css';

export default function HeaderSearchBar() {
  return (
    <div className={`${styles.search} hoverable`}>
      <FaMagnifyingGlass />
      <input type="search" placeholder="Шукати" />
    </div>
  );
}
