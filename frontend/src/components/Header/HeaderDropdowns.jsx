import { useGetCategoriesQuery } from '../../state/item';
import Loading from '../../utils/Loading';
import TextWithDropdown from '../TextWithDropdown';
import styles from './Header.module.css';

export default function HeaderDropdowns() {
  const { data, isLoading } = useGetCategoriesQuery();

  if (isLoading) return <Loading />;

  return (
    <div className={styles.dropdowns}>
      {Object.keys(data).map((key) => (
        <TextWithDropdown key={key} name={key} data={data[key]} />
      ))}
    </div>
  );
}
