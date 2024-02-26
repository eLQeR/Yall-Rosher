import { useEffect, useState } from 'react'
import styles from './TextWithDropdown.module.css'
import { Link } from 'react-router-dom'

const TextWithDropdown = ({ text, forWho }) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [data, setData] = useState({})

    useEffect(() => {
        const controller = new AbortController()

        fetch(
            `http://127.0.0.1:8000/api/yall-rosher/semi-categories/?category=${text}`
        )
            .then((res) => res.json())
            .then((data) => {
                const mapping = {}

                data.forEach((category) => {
                    if (!mapping[category.type]) mapping[category.type] = []

                    mapping[category.type].push({
                        id: category.id,
                        name: category.name,
                    })
                })
                setData(mapping)
            })
            .catch((err) => console.log(err))

        return () => {
            controller.abort()
        }
    }, [])

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
