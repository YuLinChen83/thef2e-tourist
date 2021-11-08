import React from "react";
import { useHistory } from "react-router-dom";
import SearchInput from "../shared/SearchInput";
import Button from "../shared/Button";
import Logo from "../../assets/TOURist.png";
import { ReactComponent as TourIcon } from "../../assets/icons/tour.svg";
import { ReactComponent as FoodIcon } from "../../assets/icons/food.svg";
import { ReactComponent as BedIcon } from "../../assets/icons/bed.svg";

const Header = () => {
  const history = useHistory();
  return (
    <nav className="sticky top-0 bg-grey-200 h-16 px-8 flex items-center justify-center z-10">
      <div className="w-full max-w-5xl flex justify-between">
        <div className="flex items-center">
          <img
            src={Logo}
            alt="logo"
            className="h-5 w-auto mr-8 cursor-pointer"
            onClick={() => history.push("/")}
          />
          <SearchInput />
        </div>
        <div className="flex">
          <Button
            variant="outlined"
            onClick={() => history.push("/attraction")}
          >
            找景點
            <TourIcon className="ml-2" />
          </Button>
          <Button
            variant="outlined"
            onClick={() => history.push("/restaurant")}
          >
            找餐廳
            <FoodIcon className="ml-2" />
          </Button>
          <Button variant="outlined" onClick={() => history.push("/hotel")}>
            找飯店
            <BedIcon className="ml-2" />
          </Button>
          <Button
            className="ml-2"
            variant="filled"
            onClick={() => history.push("/my")}
          >
            我的旅程
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
