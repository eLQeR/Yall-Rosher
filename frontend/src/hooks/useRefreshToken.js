import { useDispatch, useSelector } from 'react-redux'
import { refreshAccessToken } from '../state/userSlice/userSlice'
import axios from '../api/axios'

const useRefreshToken = () => {
    const { refreshToken } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const refresh = async () => {
        try {
            const res = await axios.post(
                '/token/refresh/',
                JSON.stringify({ refresh: refreshToken }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            )

            dispatch(refreshAccessToken(res.data.access))
            return res.data.access
        } catch (error) {
            console.log(error)
        }
    }

    return refresh
}

export default useRefreshToken
