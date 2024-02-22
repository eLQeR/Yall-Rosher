import { useEffect, useState } from 'react'
import './TextWithDropdown.css'

const TextWithDropdown = ({ text, forWho }) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [data, setData] = useState({})

    useEffect(() => {
        const controller = new AbortController()
        console.log('fetch')

        fetch(
            `http://127.0.0.1:8000/api/yall-rosher/category/semi/semi-categories/${forWho}`
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
                                            <a href="/items">
                                                {semiCategory.name}
                                            </a>
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
