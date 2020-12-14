import React from "react";
import StarRating from "react-star-ratings";

const AverageRating = ({ product }) => {
  let ratingsArray = product.ratings;
  let ratingStarArray = [];
  let ratingLength = product.ratings.length;

  ratingStarArray = ratingsArray.map((rating) => rating.star);

  let totalRating = ratingStarArray.reduce(
    (accumulator, current) => accumulator + current,
    0
  );

  let highest = ratingLength * 5;
  let result = (totalRating * 5) / highest;

  return (
    <div className="text-center py-3">
      {product.ratings.length > 0 ? (
        <span>
          <StarRating
            starDimension="20px"
            starSpacing="2px"
            editing={false}
            rating={result}
            starRatedColor="red"
          />{" "}
          ({product.ratings.length || 0})
        </span>
      ) : (
        <p>No Ratings Yet</p>
      )}
    </div>
  );
};

export default AverageRating;
