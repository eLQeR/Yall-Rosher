import styles from './Header.module.css'
import { MdAccountCircle } from 'react-icons/md'
import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import TextWithDropdown from './TextWithDropdown'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header
            className={`${styles.container} ${styles['hidden-on-small-screen']}`}
        >
            <div className={styles['left-block']}>
                <div className={`${styles.search} hoverable`}>
                    <FaMagnifyingGlass />
                    <input type="search" placeholder="Шукати" />
                </div>
            </div>
            <div className={styles['central-block']}>
                <h1 className={`${styles.title} hoverable`}>YALL-ROSHER</h1>

                <div className={styles.dropdowns}>
                    <TextWithDropdown text="Жіноче" forWho="" />
                    <TextWithDropdown text="Чоловіче" forWho="" />
                    <TextWithDropdown text="Дівчаче" forWho="" />
                    <TextWithDropdown text="Хлопчаче" forWho="" />
                    <TextWithDropdown text="Дитяче" forWho="" />
                    <Link to="/sale">
                        <span className={styles.red}>Розпродаж</span>
                    </Link>
                </div>
            </div>
            <div className={styles['right-block']}>
                <div className={styles.buttons}>
                    <div className={`${styles.button} hoverable`}>
                        <MdAccountCircle />
                        <span>Акаунт</span>
                    </div>
                    <div className={`${styles.button} hoverable`}>
                        <FaHeart />
                        <span>Обране</span>
                    </div>
                    <div className={`${styles.button} hoverable`}>
                        <FaShoppingCart />
                        <span>Кошик</span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
