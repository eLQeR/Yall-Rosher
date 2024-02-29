import { useSelector } from 'react-redux'
import { axiosPrivate } from '../api/axios'
import useRefreshToken from './useRefreshToken'
import { useEffect } from 'react'

const useAxiosPrivate = () => {
    const refresh = useRefreshToken()
    const { accessToken } = useSelector((state) => state.user)

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers['Authorization'])
                    config.headers['Authorization'] = `Bearer ${accessToken}`
                return config
            },
            (error) => Promise.reject(error)
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true
                    const newAccessToken = await refresh()
                    prevRequest.headers[
                        'Authorization'
                    ] = `Bearer ${newAccessToken}`
                    return axiosPrivate(prevRequest)
                }
                return Promise.reject(error)
            }
        )

        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept)
            axiosPrivate.interceptors.request.eject(requestIntercept)
        }
    }, [refresh, accessToken])

    return axiosPrivate
}

export default useAxiosPrivate
