import { useState, useRef, useCallback, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [localSearchValue, setLocalSearchValue] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // eslint-disable-next-line
  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 350),
    [],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    if (value.match(/[a-z]/i)) {
      setIsInvalid(true);
      value = value.replace(/[a-z]/gi, '');
    } else {
      setIsInvalid(false);
    }

    if (value.indexOf(' ') === 0) {
      setIsInvalid(true);
      value = '';
    }

    if (!value.match(/[a-z]/i) && value.indexOf(' ') === 1) {
      setIsInvalid(false);
    }

    setLocalSearchValue(value);
    updateSearchValue(value);
  };

  const clearInputs = (event: React.MouseEvent<SVGSVGElement>) => {
    setLocalSearchValue('');
    dispatch(setSearchValue(''));
    setIsInvalid(false);

    inputRef.current?.focus();
  };

  return (
    <div className={styles.wrapper}>
      {localSearchValue && (
        <svg
          className={`${styles.icon} ${styles.iconClose}`}
          onClick={clearInputs}
          xmlns='http://www.w3.org/2000/svg'
          width='512'
          height='512'
          viewBox='0 0 512 512'>
          <path
            d='m25 512a25 25 0 0 1 -17.68-42.68l462-462a25 25 0 0 1 35.36 35.36l-462 462a24.93 24.93 0 0 1 -17.68 7.32z'
            fill='#000000'
            data-original='#000000'></path>
          <path
            d='m487 512a24.93 24.93 0 0 1 -17.68-7.32l-462-462a25 25 0 0 1 35.36-35.36l462 462a25 25 0 0 1 -17.68 42.68z'
            fill='#000000'
            data-original='#000000'></path>
        </svg>
      )}
      <input
        ref={inputRef}
        className={styles.search}
        style={{ borderColor: isInvalid ? 'red' : '' }}
        placeholder='Поиск...'
        type='text'
        value={localSearchValue}
        onChange={onChangeInput}
        onBlur={() => setIsInvalid(false)}
      />
      <svg
        className={styles.icon}
        xmlns='http://www.w3.org/2000/svg'
        fill='#000000'
        viewBox='0 0 30 30'
        width='30px'
        height='30px'>
        <path d='M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z' />
      </svg>
    </div>
  );
};

export default Search;
