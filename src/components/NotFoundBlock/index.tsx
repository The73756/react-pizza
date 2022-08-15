import BackBtn from '../BackBtn';
import styles from './NotFoundBlock.module.scss';

type NotFoundBlockProps = {
  isSearch?: boolean;
};

const NotFound: React.FC<NotFoundBlockProps> = ({ isSearch }) => {
  return (
    <div className={styles.notFound}>
      <h1>
        <span>&#128530;</span>
        Ничего не найдено
      </h1>
      <p className={styles.descr}>
        {isSearch
          ? 'Может, вы найдете в нашем ассортименте что то другое?'
          : 'Ой! Вы куда то не туда жмали!'}
      </p>
      {!isSearch ? <BackBtn /> : ''}
    </div>
  );
};
export default NotFound;
