import React from "react";
import clsx from "clsx";
import { Route, Switch, useHistory } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import SearchInput from "../components/shared/SearchInput";
import Button from "../components/shared/Button";
import ThemeSwiper from "../components/shared/ThemeSwiper";
import SpotBg from "../assets/images/bg.png";
import SpotBg2 from "../assets/images/bg-m.png";

const Homepage = () => {
  const history = useHistory();
  const { data: hotList = [], error: hotListError } = useSWR(
    "/v2/Tourism/ScenicSpot?$top=30&$format=JSON",
    fetcher
  );
  const { data: rainbowList = [], error: rainbowListError } = useSWR(
    "/v2/Tourism/ScenicSpot?$filter=contains(Name%20%2C'%E5%BD%A9%E8%99%B9')&$top=10&$format=JSON",
    fetcher
  );
  if (hotListError || rainbowListError) return <>Something Error!</>;

  return (
    <>
      <div className="relative">
        <img src={SpotBg} alt="spot" className="w-full" />
        <div
          className={clsx(
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
            "flex flex-col items-center"
          )}
        >
          <h1
            className="font-semibold text-5xl text-white mb-5"
            onClick={() => history.push("/my")}
          >
            開始實現你的夢想旅程
          </h1>
          <SearchInput size="l" />
        </div>
      </div>
      <ThemeSwiper
        title="熱門打卡景點"
        moreLink="/"
        className="hot"
        data={hotList
          .filter((item) => !!item.Picture.PictureUrl1)
          .map((item) => ({
            name: item.Name,
            picture: item.Picture.PictureUrl1,
            tags: [
              item.Address.match(/^.{2}[縣|市]/)[0],
              item.OpenTime ===
                "Sun 24 hours；Mon 24 hours；Tue 24 hours；Wed 24 hours；Thu 24 hours；Fri 24 hours；Sat 24 hours" ||
              "全天"
                ? "全天候開放"
                : item.OpenTime,
            ],
          }))}
      />
      <div className="relative">
        <img src={SpotBg2} alt="spot theme" className="w-full" />
        <div
          className={clsx(
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3",
            "flex flex-col items-center"
          )}
        >
          <h2 className="font-semibold text-4xl text-white mb-5">
            你不能錯過的注目景點！
          </h2>
          <Button variant="filled" onClick={() => history.push("/theme")}>
            賞楓秘境看這裡
          </Button>
        </div>
      </div>
      <ThemeSwiper
        title="Rainbow Life!"
        moreLink="/"
        className="hot"
        data={rainbowList
          .filter((item) => !!item.Picture.PictureUrl1)
          .map((item) => ({
            name: item.Name,
            picture: item.Picture.PictureUrl1,
            tags: [
              item.City || item.Address?.match(/^.{2}[縣|市]/)[0],
              item.OpenTime ===
                "Sun 24 hours；Mon 24 hours；Tue 24 hours；Wed 24 hours；Thu 24 hours；Fri 24 hours；Sat 24 hours" ||
              "全天"
                ? "全天候開放"
                : item.OpenTime,
            ],
          }))}
      />
    </>
  );
};

export default Homepage;
