import React, { Fragment, useState, useEffect, useRef } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Link, useHistory, useLocation } from "react-router-dom";
import clsx from "clsx";
import AttractionBg from "../assets/images/attraction.png";
import { ReactComponent as FilterIcon } from "../assets/icons/filter.svg";
import { ReactComponent as ListIcon } from "../assets/icons/list.svg";
import { ReactComponent as ArrowIcon } from "../assets/icons/arrow.svg";
import { REGION } from "../constants";

const Attraction = () => {
  const ref = useRef();
  const location = useLocation();
  const [filter, setFilter] = useState({
    region: "",
    visitDate: "",
    type: "",
  });
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [regionExpand, setRegionExpand] = useState({ 臺北市: true });

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    setFilter({ ...filter, region: query.get("region") });
  }, [location.search]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isRegionOpen && ref.current && !ref.current.contains(e.target)) {
        setIsRegionOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () =>
      document.removeEventListener("mousedown", checkIfClickedOutside);
  }, [isRegionOpen]);

  return (
    <div className="m-auto">
      <div className="relative">
        <div className="bg-attraction bg-center h-40">
          <div className="w-full h-full bg-grey-600 backdrop-filter backdrop-blur-lg opacity-40 "></div>
        </div>
        <div
          className={clsx(
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
            "w-full flex flex-col px-36"
          )}
        >
          <h1 className="font-medium text-4xl text-white mb-3">景點列表</h1>
          <div className="flex justify-between">
            <div className="relative" ref={ref}>
              <div
                className={clsx(
                  "w-64 flex items-center mr-4 tracking-widest rounded-2xl px-4 py-1 text-sm",
                  "bg-white border border-primary-700 text-primary-700"
                )}
                onClick={() => setIsRegionOpen(true)}
              >
                {filter.region || "選擇地區"}
              </div>
              <div
                className={clsx(
                  "origin-top-left absolute left-0 mt-2 py-3 px-6 w-tw h-wh overflow-scroll",
                  "rounded-md shadow-lg text-grey-700 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none",
                  !isRegionOpen && "hidden"
                )}
              >
                <div className="flex flex-col">
                  {/* <div> */}
                  {Object.keys(REGION).map((area) => (
                    <div key={area}>
                      <div className="font-semibold text-sm mb-1 ml-1 pt-3">
                        {area}
                      </div>
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
                                    filter.region === country &&
                                      "text-primary-600",
                                    "block text-lg whitespace-nowrap hover:text-primary-600",
                                    "font-semibold ext-lg py-1 pr-3"
                                  )}
                                >
                                  {country}
                                </Link>
                                {regionExpand[country] ? (
                                  <ArrowIcon
                                    className="fill-current cursor-pointer"
                                    onClick={() =>
                                      setRegionExpand({ [country]: false })
                                    }
                                  />
                                ) : (
                                  <ArrowIcon
                                    className="fill-current cursor-pointer transform -rotate-90"
                                    onClick={() =>
                                      setRegionExpand({ [country]: true })
                                    }
                                  />
                                )}
                              </div>
                              <div
                                className={clsx(
                                  "flex flex-wrap text-md whitespace-nowrap mb-2",
                                  !regionExpand[country] &&
                                    "h-0 overflow-hidden"
                                )}
                              >
                                {REGION[area][country].map((region, index) => (
                                  <Link
                                    key={region}
                                    to={`/attraction?region=${region}`}
                                    className={clsx(
                                      (regionExpand[region] ||
                                        filter.region === region) &&
                                        "text-primary-600",
                                      "hover:text-primary-600 pr-5",
                                      index % 6 === 5 && "pr-0"
                                    )}
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
                  {/* </div> */}
                </div>
              </div>
            </div>
            {/* <div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button
                    className={clsx(
                      "w-64 flex items-center mr-4 tracking-widest rounded-2xl px-4 py-1 text-sm",
                      "bg-white border border-primary-700 text-primary-700"
                    )}
                  >
                    選擇地區
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-left absolute left-0 mt-2 w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-4 px-8 flex w-full">
                      {Object.keys(REGION).map((area) => (
                        <div className="w-full flex flex-col">
                          <div className="font-semibold text-sm">{area}</div>
                          <div>
                            {Object.keys(REGION[area]).map((country) => (
                              <div className="font-bold border-b border-gray-400 py-3 flex flex-col mt-4">
                                <div className="flex justify-between">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        href="#"
                                        className={clsx(
                                          "flex justify-between",
                                          "block px-4 py-2 text-sm whitespace-nowrap",
                                          (active || regionExpand[country]) &&
                                            "text-primary-700"
                                        )}
                                      >
                                        {country}

                                        {regionExpand[country] ? (
                                          <svg
                                            className="fill-current"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            height="24"
                                          >
                                            <path
                                              className="heroicon-ui"
                                              d="M12 22a10 10 0 110-20 10 10 0 010 20zm0-2a8 8 0 100-16 8 8 0 000 16zm1-9h2a1 1 0 010 2h-2v2a1 1 0 01-2 0v-2H9a1 1 0 010-2h2V9a1 1 0 012 0v2z"
                                            />
                                          </svg>
                                        ) : (
                                          <svg
                                            className="fill-current"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            height="24"
                                          >
                                            <path
                                              className="heroicon-ui"
                                              d="M12 22a10 10 0 110-20 10 10 0 010 20zm0-2a8 8 0 100-16 8 8 0 000 16zm4-8a1 1 0 01-1 1H9a1 1 0 010-2h6a1 1 0 011 1z"
                                            />
                                          </svg>
                                        )}
                                      </a>
                                    )}
                                  </Menu.Item>
                                </div>
                                <div className="text-gray-700 text-sm mt-2 w-full flex flex-wrap">
                                  {REGION[area][country].map((region) => (
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          href="#"
                                          className={clsx(
                                            active && "text-primary-700",
                                            "block px-4 py-2 text-sm whitespace-nowrap"
                                          )}
                                        >
                                          {region}
                                        </a>
                                      )}
                                    </Menu.Item>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="flex items-center mr-4 tracking-widest rounded-2xl px-3 py-1 border-primary-700 text-sm text-primary-700">
                    選擇參觀日期
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={clsx(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Account settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={clsx(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Support
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={clsx(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            License
                          </a>
                        )}
                      </Menu.Item>
                      <form method="POST" action="#">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              type="submit"
                              className={clsx(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block w-full text-left px-4 py-2 text-sm"
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </form>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div> */}
            <div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="flex items-center mr-4 tracking-widest rounded-2xl px-3 py-1 bg-primary-700 text-sm text-white">
                    篩選
                    <FilterIcon />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={clsx(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Account settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={clsx(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Support
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={clsx(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            License
                          </a>
                        )}
                      </Menu.Item>
                      <form method="POST" action="#">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              type="submit"
                              className={clsx(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block w-full text-left px-4 py-2 text-sm"
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </form>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="flex items-center tracking-widest rounded-3xl px-2 py-2 bg-primary-700 text-sm text-white">
                    <ListIcon />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={clsx(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Account settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={clsx(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Support
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={clsx(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            License
                          </a>
                        )}
                      </Menu.Item>
                      <form method="POST" action="#">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              type="submit"
                              className={clsx(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block w-full text-left px-4 py-2 text-sm"
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </form>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Attraction;
