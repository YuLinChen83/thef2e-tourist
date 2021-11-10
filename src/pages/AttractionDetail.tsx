// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/free-mode';
// import 'swiper/css/navigation';
// import 'swiper/css/thumbs';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React, { useState } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import SwiperCore, { FreeMode, Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ReactComponent as HeartOutlineIcon } from '../assets/icons/heart-outline.svg';
import { ReactComponent as PhoneIcon } from '../assets/icons/phone.svg';
import { ReactComponent as WebIcon } from '../assets/icons/web.svg';
import Button from '../components/shared/Button';
import Star from '../components/shared/Star';
import { useQuery } from '../hooks/useQuery';

SwiperCore.use([FreeMode, Navigation, Thumbs]);

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const AttractionDetail = ({ match }) => {
  const id = match.params.id;

  const { data, isLoading } = useQuery(
    `/v2/Tourism/ScenicSpot?$filter=ID%20eq%20'${id}'&$format=JSON`,
  );

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_APP_G_KEY,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  console.log(data);

  if (isLoading) return null;

  const [
    {
      City: city,
      Name: name,
      Class1: category1,
      Class2: category2,
      Class3: category3,
      DescriptionDetail: descriptionDetail,
      ZipCode: zipCode,
      Address: address,
      OpenTime: openTime,
      WebsiteUrl: websiteUrl,
    },
  ] = data;
  // ID,Name,Address,Picture,City,Class1,Class2,Class3,OpenTime,TicketInfo

  return (
    <div className="flex flex-col px-36">
      <nav className="container">
        <ol className="list-reset py-4 rounded flex bg-grey-light text-grey">
          <li>
            <a href="#" className="no-underline text-indigo">
              {city}
            </a>
          </li>
          <li className="px-2">/</li>
          <li>
            <a href="#" className="no-underline text-indigo">
              區
            </a>
          </li>
          <li className="px-2">/</li>
          <li>類</li>
        </ol>
      </nav>
      <div className="flex justify-between">
        <h1 className="text-grey text-3xl tracking-widest font-semibold whitespace-nowrap">
          {name}
        </h1>
        <div className="inline-flex">
          <Button variant="filled">
            <a href="tel:+4733378901">撥打電話</a>
            <PhoneIcon className="ml-1" />
          </Button>
          {websiteUrl && (
            <Button variant="outlined" className="px-2" onClick={() => window.open(websiteUrl)}>
              <WebIcon className="text-primary-700 w-4" />
            </Button>
          )}
          <Button variant="outlined" className="px-2" onClick={() => {}}>
            <HeartOutlineIcon className="text-primary-700 w-4" />
          </Button>
        </div>
      </div>
      <div className="inline-flex mt-4 mb-2 text-grey">
        <Star count={5} />
        <span className="px-4">{`${5} 則評價`}</span>
        <span>{city}</span>
      </div>
      <div className="inline-flex gap-2 mb-5">
        {[category1, category2, category3].filter(Boolean).map((tag, idx) => (
          <span
            key={idx}
            className="flex items-center h-6 bg-primary text-white text-xs rounded-xl px-2"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="inline-flex gap-3">
        <div className="border border-grey-300 w-1/3 flex-none px-7 py-6">
          <dl>
            <dt className="text-primary-800 font-medium text-2xl mb-2">關於</dt>
            <dd className="text-grey-600">{descriptionDetail}</dd>
            <dt className="text-primary-800 font-medium text-2xl mb-2 mt-4">地址</dt>
            <dd className="text-grey-600">
              {zipCode} {address}
            </dd>
            <dt className="text-primary-800 font-medium text-2xl mb-2 mt-4">開放時間</dt>
            <dd className="text-grey-600">{openTime}</dd>
          </dl>
        </div>
        <div className="flex-grow h-swiper">
          <Swiper
            style={{ '--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#fff' }}
            loop={true}
            // spaceBetween={3}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            className="mySwiper2"
          >
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
            </SwiperSlide>
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            // spaceBetween={3}
            slidesPerView={2}
            freeMode={true}
            watchSlidesProgress={true}
            className="mySwiper"
          >
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <section className="mt-8">
        <h2 className="text-primary-800 font-medium text-2xl mb-3">景點特色</h2>
        <p className="text-grey-600 px-4">
          景點特色敘述景點特色敘述景點特色敘述景點特色敘述景點特色敘述景點特色敘述景點特色敘述景點特色敘述景點特色敘述景點特色敘述
        </p>
      </section>
      <section className="mt-8">
        <h2 className="text-primary-800 font-medium text-2xl mb-3">服務設施</h2>
        <p className="text-grey-600 px-4">
          景點特色敘述景點特色敘述景點特色敘述景點特色敘述景點特色敘述景點特色敘述景點特色敘述景點特色敘述景點特色敘述景點特色敘述
        </p>
      </section>
      <section className="mt-8">
        <h2 className="text-primary-800 font-medium text-2xl mb-3">交通方式</h2>
        <p className="text-grey-600 px-4">
          景點特色敘述景點特色敘述景點特色敘述景點特色敘述景點特色敘述景點特色敘述景點特色敘述景點特色敘述景點特色敘述景點特色敘述
        </p>
      </section>
      <section className="mt-8">
        <h2 className="text-primary-800 font-medium text-2xl mb-3">鄰近景點</h2>
        <div className="inline-flex w-full h-swiper">
          <div className="border border-grey-300 w-1/3 flex-none px-7 py-6">List</div>
          <div className="flex-grow rounded-lg">
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
              >
                {/* Child components, such as markers, info windows, etc. */}
                <></>
              </GoogleMap>
            )}
          </div>
        </div>
      </section>
      <section className="mt-8">
        <h2 className="text-primary-800 font-medium text-2xl mb-3">旅客評價</h2>
        <div className="flex flex-col">
          <div className="inline-flex items-center mb-6">
            <span className="px-6 text-grey-700 text-2xl font-bold">4.5</span>
            <Star count={4.5} />
            <span className="px-6">{`${5} 則評價`}</span>
          </div>
          <ul className="mb-9">
            <li className="inline-flex border-b border-border pb-8">
              <div className="flex-none w-40 flex justify-center items-center">
                <div
                  className="w-24 h-24 rounded-full bg-center bg-cover"
                  style={{ backgroundImage: `url('https://i.pravatar.cc/90')` }}
                />
              </div>
              <div className="flex-auto flex flex-col">
                <div className="flex justify-between">
                  <span className="font-medium text-grey-700 text-xl">路上容易塞車</span>
                  <Star count={4.5} />
                </div>
                <p className="text-grey-700">
                  最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五
                </p>
              </div>
            </li>
            <li className="inline-flex border-b border-border py-8">
              <div className="flex-none w-40 flex justify-center items-center">
                <div
                  className="w-24 h-24 rounded-full bg-center bg-cover"
                  style={{ backgroundImage: `url('https://i.pravatar.cc/90')` }}
                />
              </div>
              <div className="flex-auto flex flex-col">
                <div className="flex justify-between">
                  <span className="font-medium text-grey-700 text-xl">路上容易塞車</span>
                  <Star count={4.5} />
                </div>
                <p className="text-grey-700">
                  最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五
                </p>
              </div>
            </li>
            <li className="inline-flex py-8">
              <div className="flex-none w-40 flex justify-center items-center">
                <div
                  className="w-24 h-24 rounded-full bg-center bg-cover"
                  style={{ backgroundImage: `url('https://i.pravatar.cc/90')` }}
                />
              </div>
              <div className="flex-auto flex flex-col">
                <div className="flex justify-between">
                  <span className="font-medium text-grey-700 text-xl">路上容易塞車</span>
                  <Star count={4.5} />
                </div>
                <p className="text-grey-700">
                  最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五最多一百五
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};
export default AttractionDetail;
// C1_315081100H_000004
// Picture/PictureUrl1 ne null and City ne null
// ID,Name,Address,Picture,City,Class1,Class2,Class3,OpenTime,TicketInfo
