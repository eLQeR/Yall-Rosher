import { useState } from 'react'
import './TextWithDropdown.css'

const TextWithDropdown = ({ text, DropdownComponent }) => {
    const [showDropdown, setShowDropdown] = useState(false)

    return (
        <span
            className="text"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
        >
            {text}
            {showDropdown ? (
                <div className="dropdown">
                    <DropdownComponent />
                </div>
            ) : (
                ''
            )}
        </span>
    )
}

export default TextWithDropdown
