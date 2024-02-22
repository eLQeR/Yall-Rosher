import './Header.css'
import { MdAccountCircle } from 'react-icons/md'
import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import TextWithDropdown from './TextWithDropdown'

const Header = () => {
    return (
        <header>
            <div className="half">
                <div className="title hoverable">
                    <img src="logo.png" alt="logo" />
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
            <div className="half bottom">
                <TextWithDropdown text="Жіноче" forWho="" />
                <TextWithDropdown text="Чоловіче" forWho="" />
                <TextWithDropdown text="Дитяче" forWho="" />
                <TextWithDropdown text="Унісекс" forWho="" />
                <TextWithDropdown text="Дівчаче" forWho="" />
                <TextWithDropdown text="Хлопчаче" forWho="" />
                <TextWithDropdown text="Аксесуари" forWho="" />
            </div>
        </header>
    )
}

export default Header
