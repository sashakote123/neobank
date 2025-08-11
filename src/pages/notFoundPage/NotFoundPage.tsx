import { Link } from 'react-router';

import notFound from './assets/notfound.png';
import styles from './styles.module.css';

const NotFoundPage = () => {
  return (
    <div data-testid="notFound" className={styles.container}>
      <div className={styles.left}>
        <h1 className={styles.title}>Oops...</h1>
        <h2 className={styles.subtitle}>Page not found</h2>
        <div className={styles.desc}>
          This Page doesn`t exist or was removed! We suggest you go back.
        </div>
        <button className={styles.backButton}>
          <Link to="/">Go back</Link>
        </button>
      </div>

      <div className={styles.right}>
        <img src={notFound} alt="notFound" />
      </div>
    </div>
  );
};
export default NotFoundPage;
