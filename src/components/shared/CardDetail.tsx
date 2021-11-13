import React from 'react';

import Star from '../../components/shared/Star';
import Tags from '../../components/shared/Tags';

const CardDetail = ({ name, picture, city, category1, category2, category3, star }) => (
  <>
    <div className="card-zoom">
      <div className="card-zoom-image" style={{ backgroundImage: `url('${picture}')` }}></div>
    </div>
    <h3 className="text-lg font-semibold py-2">{name}</h3>
    <Star count={star} />
    <div className="pt-1 flex flex-wrap gap-2 whitespace-nowrap">
      <Tags data={[city, category1, category2, category3].filter(Boolean)} />
    </div>
    {/* <p>desc</p> */}
  </>
);
export default CardDetail;
