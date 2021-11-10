import React from 'react';

import Star from '../../components/shared/Star';

const CardDetail = ({ name, picture, city, category1, category2, category3, star }) => (
  <>
    <div className="card-zoom">
      <div className="card-zoom-image" style={{ backgroundImage: `url('${picture}')` }}></div>
    </div>
    <h3 className="text-lg font-semibold py-2">{name}</h3>
    <Star count={star} />
    <div className="pt-1 flex flex-wrap gap-2 whitespace-nowrap">
      {[city, category1, category2, category3].filter(Boolean).map((tag, idx) => (
        <span
          key={idx}
          className="flex items-center h-6 bg-primary text-white text-xs rounded-xl px-2"
        >
          {tag}
        </span>
      ))}
    </div>
    {/* <p>desc</p> */}
  </>
);
export default CardDetail;
