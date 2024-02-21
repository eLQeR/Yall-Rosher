import './Header.css'
import { MdAccountCircle } from 'react-icons/md'
import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import TextWithDropdown from './TextWithDropdown'
import NewDropdown from './dropdowns/New'
import ForWomanDropdown from './dropdowns/ForWoman'
import ForManDropdown from './dropdowns/ForMan'

const Header = () => {
    return (
        <header>
            <div className="half">
                <div className="title hoverable">
                    <img src="../assets/logo.png" alt="logo" />
                    <h1>YALL-ROSHER</h1>
                </div>
                <div className="search-bar">
                    <FaMagnifyingGlass />
                    <input type="search" placeholder="Шукати" />
                </div>
                <div className="buttons">
                    <div className="button hoverable">
                        <MdAccountCircle />
                        <span>Акаунт</span>
                    </div>
                    <div className="button hoverable">
                        <FaHeart />
                        <span>Обране</span>
                    </div>
                    <div className="button hoverable">
                        <FaShoppingCart />
                        <span>Кошик</span>
                    </div>
                </div>
            </div>
            <div className="half">
                <TextWithDropdown
                    text="Новинки"
                    DropdownComponent={NewDropdown}
                />
                <TextWithDropdown
                    text="Для жінок"
                    DropdownComponent={ForWomanDropdown}
                />
                <TextWithDropdown
                    text="Для чоловіків"
                    DropdownComponent={ForManDropdown}
                />
            </div>
        </header>
    )
}

export default Header
