import { useParams } from 'react-router';
import Item from '../components/Item';
import styles from './Items.module.css';
import { Link } from 'react-router-dom';
import { useGetAllItemsQuery } from '../state/item/api';
import Loading from '../utils/Loading';

const Items = () => {
  const { category } = useParams();
  const { data: items, isLoading } = useGetAllItemsQuery(category);

  if (isLoading) return <Loading />;

  return (
    <div className={styles['items-page']}>
      <div className={styles.items}>
        {items.map((item) => (
          <Link key={item.id} to={`/item/${item.id}`}>
            <Item
              name={item.name}
              price={+item.price}
              img={item.images[0].image}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Items;
