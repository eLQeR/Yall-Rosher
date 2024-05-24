import styles from './SignUp.module.css';
import { Link } from 'react-router-dom';
import Loading from '../utils/Loading';

import { useSignup } from '../hooks/useSignup';

const SignUp = () => {
  const { loading, error, handleFormSubmit, handleInputChange } = useSignup();

  if (loading) return <Loading />;

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
  );
};

export default SignUp;
