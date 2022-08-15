import styles from './Preloader.module.scss';

const Preloader: React.FC = () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Preloader;
