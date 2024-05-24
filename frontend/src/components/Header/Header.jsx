import styles from './Header.module.css';
import HeaderButtons from './HeaderButtons';
import HeaderDropdowns from './HeaderDropdowns';
import HeaderSearchBar from './HeaderSearchBar';
import HeaderTitle from './HeaderTitle';

const Header = () => {
  return (
    <header
      className={`${styles.container} ${styles['hidden-on-small-screen']}`}>
      <div className={styles['left-block']}>
        <HeaderSearchBar />
      </div>
      <div className={styles['central-block']}>
        <HeaderTitle />
        <HeaderDropdowns />
      </div>
      <div className={styles['right-block']}>
        <HeaderButtons />
      </div>
    </header>
  );
};

export default Header;
