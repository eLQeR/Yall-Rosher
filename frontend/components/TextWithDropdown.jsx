import { useState } from 'react'

const TextWithDropdown = ({ text, DropdownComponent }) => {
    const [showDropdown, setShowDropdown] = useState(false)

    return (
        <span
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
        >
            {text}
            {showDropdown ? <DropdownComponent /> : ''}
        </span>
    )
}

export default TextWithDropdown
