import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { logout } from '../state/user';

const Profile = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.userSlice);

  return !accessToken ? (
    <Navigate to="/login" />
  ) : (
    <div>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};

export default Profile;
