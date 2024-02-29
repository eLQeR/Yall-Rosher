import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    resetError,
    signupFailure,
    signupStart,
    signupSuccess,
} from '../state/userSlice/userSlice'
import { useNavigate } from 'react-router'
import styles from './SignUp.module.css'
import { Link } from 'react-router-dom'
import Loading from '../utils/Loading'
import axios from '../api/axios'

const SignUp = () => {
    const [formData, setFormData] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error } = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(resetError())
    }, [dispatch, formData])

    const handleInputChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        try {
            dispatch(signupStart())

            const res = await axios.post(
                '/register/',
                JSON.stringify(formData),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            )

            dispatch(signupSuccess(res.data))
            navigate('/login')
        } catch (error) {
            dispatch(signupFailure('Невірні реєстраційні дані'))
        }
    }

    if (loading) return <Loading />

    return (
        <div className={styles['signup-page']}>
            <h1>Реєстрація</h1>
            <form className={styles.form} onSubmit={handleFormSubmit}>
                <input
                    name="email"
                    placeholder="Електронна пошта"
                    type="email"
                    required
                    onChange={handleInputChange}
                />
                <input
                    name="username"
                    placeholder="Логін"
                    type="text"
                    required
                    onChange={handleInputChange}
                />
                <input
                    name="password"
                    placeholder="Пароль"
                    type="password"
                    required
                    onChange={handleInputChange}
                />
                <button type="submit">Створити обліковий запис</button>
            </form>
            <Link to="/login">
                <p>Уже маєте акаунт?</p>
            </Link>
            {error && <div className={styles.error}>{error}</div>}
        </div>
    )
}

export default SignUp
