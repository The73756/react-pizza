import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

export default function Pagination({ onChangePage, items, currentPage }) {
  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel='...'
      nextLabel='>'
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={items ? Math.ceil(items / 4) : 1}
      previousLabel='<'
      forcePage={currentPage - 1} //ибо мокапи начинает с 1, а нам надо с 0
      renderOnZerocurrentPage={null}
    />
  );
}
