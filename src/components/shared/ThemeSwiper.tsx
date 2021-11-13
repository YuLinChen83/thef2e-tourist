import clsx from 'clsx';
import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import SwiperCore, { FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Button from '../shared/Button';
import Card from '../shared/Card';
import CardDetail from '../shared/CardDetail';

SwiperCore.use([FreeMode]);

const ThemeSwiper = ({ title, moreLink, data, className }) => {
  const history = useHistory();

  return (
    <div className="pt-12 pb-8">
      <div className="mx-40 flex justify-between pb-2">
        <h2 className="text-3xl font-semibold">{title}</h2>
        <Button variant="filled" onClick={() => history.push(moreLink)}>
          查看更多
        </Button>
      </div>
      <Swiper slidesPerView="auto" spaceBetween={30} grabCursor={true} className={className}>
        {data.map((item, index) => (
          <SwiperSlide
            key={item.id}
            className={clsx(index === 0 && 'ml-40', index === data.length - 1 && 'mr-40')}
          >
            <Card
              className="w-80 cursor-pointer"
              onClick={() => {
                console.log('click!');
                history.push(`/attraction/${item.id}`);
              }}
            >
              <CardDetail {...item} />
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ThemeSwiper;
