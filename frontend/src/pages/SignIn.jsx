import styles from './SignIn.module.css';
import { Link } from 'react-router-dom';
import Loading from '../utils/Loading';
import { useSignin } from '../hooks/useSignin';

const SignIn = () => {
  const { loading, error, handleFormSubmit, handleInputChange } = useSignin();

  if (loading) return <Loading />;

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
  );
};

export default SignIn;
