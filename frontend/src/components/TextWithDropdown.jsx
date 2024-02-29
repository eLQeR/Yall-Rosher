import { useEffect, useState } from 'react'
import styles from './TextWithDropdown.module.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

const TextWithDropdown = ({ text, forWho }) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [data, setData] = useState({})
    const { accessToken } = useSelector((state) => state.user)
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        const getCategories = async () => {
            try {
                const res = await axiosPrivate.get(
                    `/semi-categories/?category=${text}`,
                    {
                        signal: controller.signal,
                    }
                )

                if (isMounted) {
                    const mapping = {}

                    res.data.forEach((category) => {
                        if (!mapping[category.type]) mapping[category.type] = []

                        mapping[category.type].push({
                            id: category.id,
                            name: category.name,
                        })
                    })
                    setData(mapping)
                }
            } catch (error) {
                if (error.code === 'ERR_CANCELED') return
                console.log(error)
            }
        }

        getCategories()

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [accessToken, text, axiosPrivate])

    return (
        <span
            className={styles.text}
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
        >
            {text}
            {showDropdown ? (
                <div className={styles.dropdown}>
                    <div className={styles.wrapper}>
                        {Object.keys(data).map((category) => (
                            <div key={category} className={styles.column}>
                                <p className={styles.title}>{category}</p>
                                <ul>
                                    {data[category].map((semiCategory) => (
                                        <li key={semiCategory.id}>
                                            <Link
                                                to={`/items/${semiCategory.id}`}
                                            >
                                                {semiCategory.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                ''
            )}
        </span>
    )
}

export default TextWithDropdown
