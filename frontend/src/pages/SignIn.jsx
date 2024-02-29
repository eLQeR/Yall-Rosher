import { useDispatch, useSelector } from 'react-redux'
import styles from './SignIn.module.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import {
    resetError,
    signinFailure,
    signinStart,
    signinSuccess,
} from '../state/userSlice/userSlice'
import { Link } from 'react-router-dom'
import Loading from '../utils/Loading'
import axios from '../api/axios'

const SignIn = () => {
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
            dispatch(signinStart())

            const res = await axios.post('/token/', JSON.stringify(formData), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            })

            dispatch(signinSuccess(res.data))
            navigate('/')
        } catch (error) {
            if (error.response?.status === 401)
                return dispatch(signinFailure('Невірні дані для входу'))
            dispatch(signinFailure('Не вдалося увійти'))
        }
    }

    if (loading) return <Loading />

    return (
        <div className={styles['signup-page']}>
            <h1>Авторизація</h1>
            <form className={styles.form} onSubmit={handleFormSubmit}>
                <input
                    name="username"
                    placeholder="Логін"
                    autoComplete="off"
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
                <button type="submit">Увійти</button>
            </form>
            <Link to="/signup">
                <p>Не маєте акаунту?</p>
            </Link>
            {error && <div className={styles.error}>{error}</div>}
        </div>
    )
}

export default SignIn
