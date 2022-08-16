import { useState, useEffect, useRef, memo } from 'react';
import { useDispatch } from 'react-redux';
import { setSort } from '../../redux/filter/slice';

import styles from './Sort.module.scss';

type SortItem = {
  id: number;
  name: string;
  reverseIcon: boolean;
  sortProperty: 'rating' | 'title' | 'price';
  order: 'asc' | 'desc';
};

type SortProps = {
  value: SortItem;
};

const sortList: SortItem[] = [
  { id: 0, name: 'популярности', reverseIcon: true, sortProperty: 'rating', order: 'desc' },
  { id: 1, name: 'популярности', reverseIcon: false, sortProperty: 'rating', order: 'asc' },
  { id: 2, name: 'алфавиту', reverseIcon: false, sortProperty: 'title', order: 'asc' },
  { id: 3, name: 'алфавиту', reverseIcon: true, sortProperty: 'title', order: 'desc' },
  { id: 4, name: 'цене', reverseIcon: false, sortProperty: 'price', order: 'asc' },
  { id: 5, name: 'цене', reverseIcon: true, sortProperty: 'price', order: 'desc' },
];

export const Sort: React.FC<SortProps> = memo(({ value }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);

  const handleClickPopup = () => {
    setIsOpen(!isOpen);
  };

  const handleClickSelect = (obj: SortItem) => {
    dispatch(setSort(obj));
    setIsOpen(false);
  };

  useEffect(() => {
    const json = JSON.stringify(value);

    if (isMounted.current) {
      localStorage.setItem('sort', json);
    }

    isMounted.current = true;
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setIsOpen(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className={`${styles.sort} ${isOpen ? styles.open : ''}`}>
      <button onClick={handleClickPopup} className={styles.label}>
        {' '}
        <svg
          width='10'
          height='6'
          viewBox='0 0 10 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
            fill='#2C2C2C'
          />
        </svg>
        <b>Сортировка по:</b>
        <span>
          {value.name}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className={styles.icon}
            style={{ transform: `rotate(${value.reverseIcon ? 180 : 0}deg)` }}
            width='10'
            height='10'
            viewBox='0 0 464 464'>
            <path
              d='M416.483,265.441c-2.704-2.777-6.419-4.336-10.295-4.321h-75.52c-5.891,0-10.667-4.776-10.667-10.667V14.293    C320.001,6.399,313.602,0,305.708,0H158.721c-7.894,0-14.293,6.399-14.293,14.293v236.16c0,5.891-4.776,10.667-10.667,10.667    H58.028c-7.893-0.149-14.412,6.128-14.561,14.02c-0.075,3.951,1.49,7.757,4.321,10.513l174.08,174.08    c2.648,2.69,6.252,4.224,10.027,4.267c3.849,0.014,7.54-1.524,10.24-4.267l174.08-174.08    C421.87,280.146,421.99,271.097,416.483,265.441z'
              fill='#000000'
              data-original='#000000'></path>
          </svg>
        </span>
      </button>
      <div className={styles.popup}>
        <ul>
          {sortList.map((obj, index) => (
            <li
              className={value.id === obj.id ? styles.active : ''}
              key={index}
              onClick={() => handleClickSelect(obj)}>
              {obj.name}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className={styles.icon}
                style={{ transform: `rotate(${obj.reverseIcon ? 180 : 0}deg)` }}
                width='10'
                height='10'
                viewBox='0 0 464 464'>
                <path
                  d='M416.483,265.441c-2.704-2.777-6.419-4.336-10.295-4.321h-75.52c-5.891,0-10.667-4.776-10.667-10.667V14.293    C320.001,6.399,313.602,0,305.708,0H158.721c-7.894,0-14.293,6.399-14.293,14.293v236.16c0,5.891-4.776,10.667-10.667,10.667    H58.028c-7.893-0.149-14.412,6.128-14.561,14.02c-0.075,3.951,1.49,7.757,4.321,10.513l174.08,174.08    c2.648,2.69,6.252,4.224,10.027,4.267c3.849,0.014,7.54-1.524,10.24-4.267l174.08-174.08    C421.87,280.146,421.99,271.097,416.483,265.441z'
                  fill='#000000'
                  data-original='#000000'></path>
              </svg>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

Sort.displayName = 'Sort';
