import React from "react";
import clsx from "clsx";
import { ReactComponent as HalfStarIcon } from "../../assets/icons/half-star-filled.svg";
import { ReactComponent as StarIcon } from "../../assets/icons/star-filled.svg";
import { ReactComponent as EmptyStarIcon } from "../../assets/icons/star-outline.svg";

const CardDetail = ({
  name,
  picture,
  tags,
}: {
  name: string;
  picture: string;
  tags: string[];
}) => (
  <>
    <div
      className="bg-cover h-40 rounded"
      style={{ backgroundImage: `url('${picture}')` }}
    />
    <h3 className="text-lg font-semibold py-1">{name}</h3>
    <div className="flex mb-3">
      <StarIcon />
      <StarIcon />
      <StarIcon />
      <HalfStarIcon />
      <EmptyStarIcon />
    </div>
    <div className="flex">
      {tags.map((tag) => (
        <span
          key={tag}
          className="flex items-center h-6 bg-primary text-white text-xs rounded-xl px-2 mr-1"
        >
          {tag}
        </span>
      ))}
    </div>
    {/* <p>desc</p> */}
  </>
);
export default CardDetail;
