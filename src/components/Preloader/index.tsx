import styles from './Preloader.module.scss';

export const Preloader: React.FC = () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.loader}></div>
    </div>
  );
};
