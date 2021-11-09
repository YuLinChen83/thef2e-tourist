import React, { Fragment, useState, useEffect, useRef, forwardRef } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Link, useHistory, useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Star from '../components/shared/Star';
import Card from '../components/shared/Card';
import CardDetail from '../components/shared/CardDetail';
import clsx from 'clsx';
import useSWR from 'swr';
import AttractionBg from '../assets/images/attraction.png';
import { ReactComponent as FilterIcon } from '../assets/icons/filter.svg';
import { ReactComponent as ListIcon } from '../assets/icons/list.svg';
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow.svg';
import { REGION } from '../constants';
import { fetcher, getCardInfo } from '../utils';

const Attraction = () => {
  const ref = useRef();
  const ref2 = useRef();
  const location = useLocation();
  const [filter, setFilter] = useState({
    region: '',
    visitDate: '',
    type: '',
    star: NaN,
  });
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [regionExpand, setRegionExpand] = useState({ 臺北市: true });

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    setFilter({ ...filter, region: query.get('region') });
  }, [location.search]);

  const { data = [], error: Error } = useSWR(
    '/v2/Tourism/ScenicSpot?$select=ID%2CName%2CAddress%2CPicture%2CCity%2CClass1%2CClass2%2CClass3%2COpenTime%2CTicketInfo&$filter=Picture%2FPictureUrl1%20ne%20null%20and%20City%20ne%20null&$top=9&$format=JSON',
    fetcher
  );

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isRegionOpen && ref.current && !ref.current.contains(e.target)) {
        setIsRegionOpen(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => document.removeEventListener('mousedown', checkIfClickedOutside);
  }, [isRegionOpen]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isFilterOpen && ref2.current && !ref2.current.contains(e.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => document.removeEventListener('mousedown', checkIfClickedOutside);
  }, [isFilterOpen]);

  return (
    <div className="flex flex-col">
      <div className="relative">
        <div className="bg-attraction bg-center h-40">
          <div className="w-full h-full bg-grey-600 backdrop-filter backdrop-blur-lg opacity-40 "></div>
        </div>
        <div
          className={clsx(
            'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
            'w-full flex flex-col px-36'
          )}
        >
          <h1 className="font-medium text-4xl text-white mb-3">景點列表</h1>
          <div className="flex justify-between">
            <div className="inline-flex">
              <div className="relative" ref={ref}>
                <div
                  className={clsx(
                    'w-64 flex items-center mr-4 tracking-widest rounded-2xl px-4 py-1 text-sm',
                    'bg-white border border-primary-700 text-primary-700'
                  )}
                  onClick={() => setIsRegionOpen(true)}
                >
                  {filter.region || '選擇地區'}
                </div>
                <div
                  className={clsx(
                    'origin-top-left absolute left-0 mt-2 py-3 px-6 w-tw h-wh overflow-scroll',
                    'rounded-md shadow-lg text-grey-600 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none',
                    !isRegionOpen && 'hidden'
                  )}
                >
                  <div className="flex flex-col">
                    {Object.keys(REGION).map((area) => (
                      <div key={area}>
                        <div className="font-semibold text-sm mb-1 ml-1 pt-3">{area}</div>
                        <div>
                          <ul>
                            {Object.keys(REGION[area]).map((country) => (
                              <li
                                key={country}
                                className="flex flex-col border-b border-grey-300 mt-2"
                              >
                                <div className="flex items-center">
                                  <Link
                                    to={`/attraction?region=${country}`}
                                    className={clsx(
                                      filter.region === country && 'text-primary-600',
                                      'block text-lg whitespace-nowrap hover:text-primary-600',
                                      'font-semibold ext-lg py-1 pr-3'
                                    )}
                                  >
                                    {country}
                                  </Link>
                                  {regionExpand[country] ? (
                                    <ArrowIcon
                                      className="fill-current cursor-pointer"
                                      onClick={() => setRegionExpand({ [country]: false })}
                                    />
                                  ) : (
                                    <ArrowIcon
                                      className="fill-current cursor-pointer transform -rotate-90"
                                      onClick={() => setRegionExpand({ [country]: true })}
                                    />
                                  )}
                                </div>
                                <div
                                  className={clsx(
                                    'flex flex-wrap text-md whitespace-nowrap mb-2 text-grey',
                                    !regionExpand[country] && 'h-0 overflow-hidden'
                                  )}
                                >
                                  {REGION[area][country].map((region, index) => (
                                    <Link
                                      key={region}
                                      to={`/attraction?region=${region}`}
                                      className={clsx(
                                        (regionExpand[region] || filter.region === region) &&
                                          'text-primary-600',
                                        'hover:text-primary-600 pr-5',
                                        index % 6 === 5 && 'pr-0'
                                      )}
                                      onClick={() => setIsRegionOpen(false)}
                                    >
                                      {region}
                                    </Link>
                                  ))}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <DatePicker
                  nextMonthButtonLabel=">"
                  previousMonthButtonLabel="<"
                  dateFormat="yyyy/MM/dd"
                  selected={filter.visitDate}
                  onChange={(date) => setFilter({ ...filter, visitDate: date })}
                  placeholderText="選擇參觀日期"
                />
              </div>
            </div>
            <div className="inline-flex">
              <div className="relative" ref={ref2}>
                <div
                  className={clsx(
                    'flex items-center tracking-widest rounded-2xl px-3 py-1 bg-primary-700 text-sm text-white cursor-pointer mr-4'
                  )}
                  onClick={() => setIsFilterOpen(true)}
                >
                  篩選
                  <FilterIcon />
                </div>
                <div
                  className={clsx(
                    'origin-top-right absolute right-0 mt-2 py-3 px-6 w-tw h-64 overflow-scroll',
                    'rounded-md shadow-lg text-grey-600 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none',
                    !isFilterOpen && 'hidden'
                  )}
                >
                  <ul className="flex flex-col">
                    <li className="flex flex-col border-b border-grey-300 mt-2">
                      <div className={clsx('flex items-center text-lg font-semibold ext-lg')}>
                        景點類型
                      </div>
                      <div className="grid grid-cols-3 py-3 text-grey">
                        {['樂園與遊樂場', '知名地標', '文化古蹟', '博物館', '公園', '購物商場'].map(
                          (type, index) => (
                            <Link
                              key={type}
                              to={`/attraction?type=${type}`}
                              className={clsx(
                                filter.type === type && 'text-primary-600',
                                'hover:text-primary-600'
                              )}
                              onClick={() => setIsFilterOpen(false)}
                            >
                              {type}
                            </Link>
                          )
                        )}
                      </div>
                    </li>
                    <li className="flex flex-col mt-2">
                      <div className={clsx('flex items-center text-lg font-semibold ext-lg')}>
                        評價
                      </div>
                      <div className="grid grid-cols-3 py-3 text-grey">
                        {[5, 4, 3, 2, 1, 0].map((star, index) => (
                          <Link
                            key={star}
                            to={`/attraction?star=${star}`}
                            className={clsx(
                              filter.star === star && 'text-primary-600',
                              'hover:opacity-80'
                            )}
                            onClick={() => setIsFilterOpen(false)}
                          >
                            <Star count={star} />
                          </Link>
                        ))}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative">
                <div
                  className={clsx(
                    'flex items-center tracking-widest rounded-3xl px-2 py-2 bg-primary-700 text-sm text-white'
                  )}
                  // onClick={() => setIsFilterOpen(true)}
                >
                  <ListIcon />
                </div>
                <div
                  className={clsx(
                    'origin-top-right absolute right-0 mt-2 py-3 px-6 w-tw h-64 overflow-scroll',
                    'rounded-md shadow-lg text-grey-600 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none',
                    // !isFilterOpen && "hidden"
                    'hidden'
                  )}
                >
                  123
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-auto">
        {data.map((item, idx) => {
          const newItem = getCardInfo(item);
          return (
            <div key={idx} className="w-90 flex justify-center">
              <Card className="w-80">
                <CardDetail {...newItem} />
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Attraction;
