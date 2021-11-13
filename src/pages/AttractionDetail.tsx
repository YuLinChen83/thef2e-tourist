// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/free-mode';
// import 'swiper/css/navigation';
// import 'swiper/css/thumbs';
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useState } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import SwiperCore, { FreeMode, Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ReactComponent as HeartOutlineIcon } from '../assets/icons/heart-outline.svg';
import { ReactComponent as FoodIcon } from '../assets/icons/p-food.svg';
import { ReactComponent as HotelIcon } from '../assets/icons/p-hotel.svg';
import { ReactComponent as Tourcon } from '../assets/icons/p-tour.svg';
import { ReactComponent as PhoneIcon } from '../assets/icons/phone.svg';
import { ReactComponent as WebIcon } from '../assets/icons/web.svg';
import Button from '../components/shared/Button';
import Star from '../components/shared/Star';
import Tags from '../components/shared/Tags';
import { useQuery } from '../hooks/useQuery';

SwiperCore.use([FreeMode, Navigation, Thumbs]);

const containerStyle = {
  width: '100%',
  height: '100%',
};

function MyComponent({ center, list }) {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_APP_G_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        {/* Child components, such as markers, info windows, etc. */}
        {list?.map(({ ID, Name, Position: { PositionLat, PositionLon } }, type) => (
          <Marker
            key={ID}
            // onLoad={onLoad}
            title={Name}
            position={{ lat: PositionLat, lng: PositionLon }}
            onMouseOver={(e) => console.log(e)}
            icon={{ attraction: <Tourcon />, restaurant: <FoodIcon />, hotel: <HotelIcon /> }[type]}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export const NearByMap = React.memo(MyComponent);

const AttractionDetail = ({ match }) => {
  const id = match.params.id;
  const history = useHistory();

  const { data, isLoading } = useQuery(`/v2/Tourism/ScenicSpot?$filter=ID%20eq%20'${id}'`);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

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
      Position: { PositionLat: lat, PositionLon: lng },
    },
  ] = data ?? [{ Position: { PositionLat: 0, PositionLon: 0 } }];

  const { data: nearByData = [] } = useQuery(
    `/v2/Tourism/ScenicSpot?$top=5&$spatialFilter=nearby(${lat},${lng},30000)`,
  );
  const { data: nearByRestaurant = [] } = useQuery(
    `/v2/Tourism/Restaurant?$top=3&$spatialFilter=nearby(${lat},${lng},30000)`,
  );

  if (isLoading) return null;

  const markerlist = nearByData
    .map((item) => ({ ...item, type: 'attraction' }))
    .concat(nearByRestaurant.map((item) => ({ ...item, type: 'restaurant' })));

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
          <div className="w-1/3 flex-none overflow-scroll">
            <ul className="mr-5">
              {markerlist.map((item) => (
                <li
                  key={item.ID}
                  className="w-full inline-flex border-b border-gray-300 py-5 first:pt-0"
                >
                  <div
                    className="w-28 h-28 rounded-lg bg-center bg-cover"
                    style={{ backgroundImage: `url('${item.Picture.PictureUrl1}')` }}
                  />
                  <div className="flex flex-col pl-5">
                    <div
                      className="text-grey-700 cursor-pointer"
                      onClick={() => history.push(`/attraction/${item.ID}`)}
                    >
                      {item.Name}
                    </div>
                    <Star count={5} />
                    <div className="pt-1 flex flex-wrap gap-2 whitespace-nowrap">
                      <Tags data={[city, category1, category2, category3].filter(Boolean)} />
                    </div>
                    {/* TODO: 距離 */}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-grow rounded-lg">
            <NearByMap
              center={{
                lat,
                lng,
              }}
              list={markerlist}
            />
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
