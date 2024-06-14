import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import {
  useGetCancelOrderMutation,
  useGetOrdersQuery,
} from '../state/item/api';
import Loading from '../utils/Loading';
import styles from './Profiles.module.css';
import { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';

const Profile = () => {
  const [pageId, setPageId] = useState(1);
  const { accessToken } = useSelector((state) => state.userSlice);
  const { data: data, isLoading, refetch } = useGetOrdersQuery(pageId);

  const [getCancelOrder] = useGetCancelOrderMutation();

  const clickHandler = async (orderId) => {
    await getCancelOrder(orderId);
    refetch();
  };

  if (isLoading) return <Loading />;

  return !accessToken ? (
    <Navigate to='/login' />
  ) : (
    <div>
      {data.count > 10 && (
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
            disabled={data.next === null}
            onClick={() => {
              setPageId((prev) => prev + 1);
            }}
          >
            <IoIosArrowForward />
          </button>
        </div>
      )}
      <ul className={styles.orders}>
        {data.results.map((order) => {
          return (
            <li key={order.id} className={styles.order}>
              {/* {order.is_canceled ? (
                <img
                  className={styles['order-img--canceled']}
                  src={order.image}
                  alt={order.id}
                />
              ) : (
                <img
                  className={styles['order-img']}
                  src={order.image}
                  alt={order.id}
                />
              )} */}
              <img
                className={styles['order-img']}
                src={order.image}
                alt={order.order_number}
              />
              <div className={styles['order-right']}>
                <p>
                  Номер замовлення: <b>{order.order_number}</b>
                </p>
                <p>
                  Дата:{' '}
                  <b>
                    {order.created.slice(0, 10)}, час:{' '}
                    {order.created.slice(11, 19)}
                  </b>
                </p>
                <p>
                  Місто: <b> {order.city}</b>
                </p>
                <p>
                  Адреса: <b>{order.address}</b>
                </p>
                <p>
                  Індекс: <b>{order.postal_code}</b>
                </p>
                <p>
                  Статус замовлення: <b>{order.status}</b>
                </p>
                <p>
                  Сумма замовлення: <b>{order.cost.split('.')[0]} UAH</b>
                </p>
                {order.status !== 'Доставлено' &&
                  (order.is_canceled ? (
                    <button
                      className={`${styles['order-btn']} ${styles['canceled-order']}`}
                      disabled
                    >
                      Скасовано
                    </button>
                  ) : (
                    <button
                      className={`${styles['order-btn']} ${styles['cancel-order']}`}
                      onClick={() => {
                        clickHandler(order.id);
                      }}
                    >
                      Скасувати
                    </button>
                  ))}
              </div>
            </li>
          );
        })}
      </ul>
      {data.count > 10 && (
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
            disabled={data.next === null}
            onClick={() => {
              setPageId((prev) => prev + 1);
            }}
          >
            <IoIosArrowForward />
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
