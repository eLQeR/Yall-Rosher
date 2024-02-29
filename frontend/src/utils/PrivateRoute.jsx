import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Navigate } from 'react-router'

const PrivateRoute = ({ children }) => {
    const [{ accessToken, refreshToken }, setCookie] = useCookies([
        'accessToken',
        'refreshToken',
    ])

    useEffect(() => {
        if (accessToken || !refreshToken) return

        fetch('http://127.0.0.1:8000/api/yall-rosher/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        })
            .then((res) => res.json())
            .then((data) => setCookie('accessToken', data.access))
            .catch((error) => console.log(error))
    }, [accessToken, refreshToken, setCookie])

    if (!accessToken) return <Navigate to="/signin" replace />
    return children
}

export default PrivateRoute
