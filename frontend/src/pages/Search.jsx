import { Link, useSearchParams } from 'react-router-dom';
import { useGetSearchDataQuery } from '../state/item';
import Loading from '../utils/Loading';
import { useEffect, useState } from 'react';
import styles from './Items.module.css';
import Item from '../components/Item';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Search = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  const [pageId, setPageId] = useState(1);
  let url = `/yall-rosher/items/?name=${name}`;
  if (pageId > 1) {
    url = `/yall-rosher/items/?name=${name}&page=${pageId}`;
  }

  const { data: data, isLoading, refetch } = useGetSearchDataQuery(url);

  useEffect(() => {
    refetch();
  }, [name, refetch, pageId]);

  if (isLoading) return <Loading />;
  return (
    <>
      {data.results.length === 0 && (
        <h2 className={styles['no-data']}>No search result</h2>
      )}

      <div className={styles['items-page']}>
        <div className={styles.items}>
          {data.results.map((item) => {
            let imgUrl = item.images[0] ? item.images[0].image : '/logo.png';

            return (
              <Link key={item.id} to={`/item/${item.id}`}>
                <Item name={item.name} price={+item.price} img={imgUrl} />
              </Link>
            );
          })}
        </div>
      </div>
      {data.count > 20 && (
        <div className={styles.pagination}>
          <button
            disabled={data.previous === null}
            onClick={() => {
              setPageId((prev) => prev - 1);
            }}
          >
            <IoIosArrowBack />
          </button>
          <button
            className={styles.superBTNDestroerWORLD2000}
            disabled={data.next === null}
            onClick={() => {
              setPageId((prev) => prev + 1);
            }}
          >
            <IoIosArrowForward />
          </button>
        </div>
      )}
    </>
  );
};

export default Search;
