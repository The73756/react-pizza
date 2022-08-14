import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

type PaginationProps = {
  onChangePage: (page: number) => void;
  currentPage: number;
  items: number;
};

const Pagination: React.FC<PaginationProps> = ({ onChangePage, items, currentPage }) => (
  <ReactPaginate
    className={styles.pagination}
    breakLabel='...'
    nextLabel='>'
    onPageChange={(event) => onChangePage(event.selected + 1)}
    pageRangeDisplayed={8}
    pageCount={items ? Math.ceil(items / 4) : 1}
    previousLabel='<'
    forcePage={currentPage - 1}
  />
);

export default Pagination;
