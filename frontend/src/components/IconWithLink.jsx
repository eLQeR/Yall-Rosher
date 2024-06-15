import { Link } from 'react-router-dom';
import styles from './IconWithLink.module.css';
import { string, func } from 'prop-types';

export default function IconWithLink({ Icon, to, label, action }) {
  return (
    <div className={`${styles.button} hoverable`}>
      <Link to={to && to} onClick={action && action}>
        <Icon />
        <span>{label}</span>
      </Link>
    </div>
  );
}

IconWithLink.propTypes = {
  Icon: func,
  to: string || null,
  label: string,
  action: func || null,
};
