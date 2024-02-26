import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Item from '../components/Item'
import styles from './Items.module.css'
import { Link } from 'react-router-dom'

const Items = () => {
    const { category } = useParams()
    const [itemData, setItemData] = useState([])

    useEffect(() => {
        const controller = new AbortController()

        fetch(
            `http://127.0.0.1:8000/api/yall-rosher/items/?category=${category}`
        )
            .then((res) => res.json())
            .then((data) => setItemData(data))
            .catch((err) => console.log(err))

        return () => controller.abort()
    }, [category])

    return (
        <div className={styles['items-page']}>
            <div className={styles.filters}>
                <p>Aboba</p>
            </div>
            <div className={styles.items}>
                {itemData.map((item) => (
                    <Link key={item.id} to={`/item/${item.id}`}>
                        <Item name={item.name} price={item.price} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Items
