import React from "react";
import StarRating from "react-star-ratings";

const FilterStar = ({ handleStarClick, numberOfStars }) => {
  return (
    <StarRating
      changeRating={() => handleStarClick(numberOfStars)}
      numberOfStars={numberOfStars}
      starDimension="20px"
      starSpacing="2px"
      starHoverColor="red"
      starEmptyColor="red"
    />
  );
};

export default FilterStar;
