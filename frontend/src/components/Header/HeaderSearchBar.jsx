import { FaMagnifyingGlass } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import styles from './Header.module.css';

export default function HeaderSearchBar() {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const searchHandler = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?name=${e.target.value}`);
    }
  };

  return (
    <div className={`${styles.search} hoverable`}>
      <FaMagnifyingGlass />
      <input
        type='search'
        placeholder='Шукати'
        onKeyDown={(e) => {
          searchHandler(e);
        }}
      />
    </div>
  );
}
