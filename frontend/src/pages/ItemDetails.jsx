import { useParams } from 'react-router'
import styles from './ItemDetails.module.css'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading'

const ItemDetails = () => {
    const { id } = useParams()
    const [itemData, setItemData] = useState({})
    const [bigPhotoId, setBigPhotoId] = useState(0)
    const [colorId, setColorId] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const controller = new AbortController()
        setLoading(true)

        fetch(`http://127.0.0.1:8000/api/yall-rosher/items/${id}/`)
            .then((res) => res.json())
            .then((data) => {
                if (!data.colors || data.colors.length === 0)
                    data.colors = [
                        { color: 'Не знайдено', hex: '#FFFFFF', id: undefined },
                    ]
                if (!data.images || data.images.length === 0)
                    data.images = [
                        {
                            image: 'data:image/jpeg;base64,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',
                        },
                    ]
                setItemData(data)
                setLoading(false)
            })
            .catch((err) => console.log(err))

        return () => controller.abort()
    }, [id])

    if (loading) return <Loading />

    console.log(itemData)

    return (
        <div className={styles['item-details-page']}>
            <div className={styles.left}>
                <div className={styles.images}>
                    <div className={styles['image-chose']}>
                        {itemData.images.map((image, index) => (
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
                        <img
                            className={styles.image}
                            src={itemData.images[bigPhotoId].image}
                        />
                    </div>
                </div>
                <div className={styles.description}></div>
            </div>
            <div className={styles.right}>
                <div className={styles.info}>
                    <p>{itemData.name}</p>
                    <p>{itemData.price} UAH</p>
                    <div className={styles.colors}>
                        <p>Колір - {itemData.colors[colorId].color}</p>
                        <div className={styles['color-boxes']}>
                            {itemData.colors.map((color, index) => (
                                <div key={index} className={styles.color}>
                                    <div
                                        className={`${styles['color-box']} hoverable`}
                                    >
                                        <div
                                            id={index}
                                            style={{
                                                width: '30px',
                                                height: '30px',
                                                background: color.hex,
                                                borderRadius: '50%',
                                            }}
                                            onClick={(e) =>
                                                setColorId(e.target.id)
                                            }
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.sizes}>
                        {itemData.sizes
                            .map((size) => size.color)
                            .includes(itemData.colors[colorId].id) ? (
                            <>
                                <p>Розмір</p>
                                <div className={styles['sizes-box']}>
                                    {itemData.sizes.map((size, index) =>
                                        size.color ===
                                        itemData.colors[colorId].id ? (
                                            <div
                                                className={`${styles.size} hoverable`}
                                                key={index}
                                            >
                                                {size.size}
                                            </div>
                                        ) : (
                                            ''
                                        )
                                    )}
                                </div>
                            </>
                        ) : (
                            <p>Не знайдено товару обраного кольору</p>
                        )}
                    </div>

                    <div className={styles.buttons}>
                        <button></button>
                        <button></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ItemDetails
