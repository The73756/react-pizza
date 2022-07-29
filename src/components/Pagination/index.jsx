import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

export default function Pagination({ onChangePage, items }) {
  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel='...'
      nextLabel='>'
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={items ? Math.ceil(items / 4) : 1}
      previousLabel='<'
      renderOnZeroPageCount={null}
    />
  );
}
