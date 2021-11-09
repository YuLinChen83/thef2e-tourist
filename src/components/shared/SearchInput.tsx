import React from 'react';
import clsx from 'clsx';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';

const SearchInput = ({ size = 's' }) => (
  <div
    className={clsx(
      'relative flex items-center',
      size === 's' && 'w-60 h-8 text-xs',
      size === 'l' && 'w-4/5 max-w-xl h-16 text-xl'
    )}
  >
    <input
      type="text"
      placeholder="想要去哪？"
      className={clsx(
        'h-full w-full text-grey hover:bg-grey-300 focus:bg-white',
        size === 's' && 'pl-4 bg-white rounded-2xl',
        size === 'l' && 'pl-8 bg-grey-200 rounded-4xl'
      )}
    />
    <SearchIcon
      className={clsx(
        'text-grey-600 absolute',
        size === 's' && 'w-4 right-4',
        size === 'l' && 'w-8 right-6'
      )}
    />
  </div>
);

export default SearchInput;
