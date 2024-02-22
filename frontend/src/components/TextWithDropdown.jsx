import { useEffect, useState } from 'react'
import './TextWithDropdown.css'
import { Link } from 'react-router-dom'

const TextWithDropdown = ({ text, forWho }) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [data, setData] = useState({})

    useEffect(() => {
        const controller = new AbortController()

        fetch(
            `http://127.0.0.1:8000/api/yall-rosher/semi-categories/?type=${text}`
        )
            .then((res) => res.json())
            .then((data) => {
                const mapping = {}

                data.forEach((category) => {
                    if (!mapping[category.category])
                        mapping[category.category] = []

                    mapping[category.category].push({
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
            className="text"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
        >
            {text}
            {showDropdown ? (
                <div className="dropdown">
                    <div className="wrapper">
                        {Object.keys(data).map((category) => (
                            <div key={category} className="column">
                                <p className="title">{category}</p>
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
