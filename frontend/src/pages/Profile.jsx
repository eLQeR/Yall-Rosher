import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const Profile = () => {
    const { accessToken } = useSelector((state) => state.user)
    if (!accessToken) return <Navigate to="/login" replace />
    return <div>Profile</div>
}

export default Profile
