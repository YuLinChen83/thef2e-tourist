import React from 'react';

import { ReactComponent as HalfStarIcon } from '../../assets/icons/half-star-filled.svg';
import { ReactComponent as StarIcon } from '../../assets/icons/star-filled.svg';
import { ReactComponent as EmptyStarIcon } from '../../assets/icons/star-outline.svg';

const Star = ({ count }) => (
  <div className="inline-flex mb-3">
    {[...new Array(Math.floor(count))].map((_, idx) => (
      <StarIcon key={idx} />
    ))}
    {count !== (count | 0) && <HalfStarIcon />}
    {[...new Array(5 - Math.ceil(count) < 0 ? 0 : 5 - Math.ceil(count))].map((_, idx) => (
      <EmptyStarIcon key={idx} />
    ))}
  </div>
);
export default Star;
