import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

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

    return <div>Items</div>
}

export default Items
