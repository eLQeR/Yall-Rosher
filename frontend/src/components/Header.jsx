import './Header.css'
import { MdAccountCircle } from 'react-icons/md'
import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import TextWithDropdown from './TextWithDropdown'

const Header = () => {
    return (
        <header className="container">
            <div className="left-block">
                <div className="search hoverable">
                    <FaMagnifyingGlass />
                    <input type="search" placeholder="Шукати" />
                </div>
            </div>
            <div className="central-block">
                <h1 className="title hoverable">YALL-ROSHER</h1>
                <div className="dropdowns">
                    <TextWithDropdown text="Жіноче" forWho="" />
                    <TextWithDropdown text="Чоловіче" forWho="" />
                    <TextWithDropdown text="Унісекс" forWho="" />
                    <TextWithDropdown text="Дівчаче" forWho="" />
                    <TextWithDropdown text="Хлопчаче" forWho="" />
                    <TextWithDropdown text="Дитяче" forWho="" />
                </div>
            </div>
            <div className="right-block">
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
        </header>
    )
}

export default Header
