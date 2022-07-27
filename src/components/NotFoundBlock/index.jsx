import styles from './NotFoundBlock.module.scss';

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <h1>
        <span>&#128530;</span>
        Ничего не найдено
      </h1>
      <p className={styles.descr}>Ой! Вы куда то не туда жмали!</p>
    </div>
  );
}
