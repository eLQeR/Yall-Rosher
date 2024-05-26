import { useSelector } from 'react-redux';

const Home = () => {
  const { user } = useSelector((state) => state.userSlice);

  return (
    <div className="centered-container">
      <input
        readOnly
        value={`Welcome to Yall Rosher${
          user !== null && ', ' + user.username
        }!`}
        className="stylish-text-field"
      />
    </div>
  );
};

export default Home;
