import React from "react";

const StarRating = ({ rating, onRatingChange }) => {
  const stars = [...Array(5)].map((_, i) => {
    const starValue = i + 1;
    const isFilled = starValue <= rating;

    const handleClick = () => {
      if (onRatingChange) {
        onRatingChange(starValue);
      }
    };

    return (
      <span
        key={i}
        className={`text-2xl ${
          onRatingChange ? "cursor-pointer" : ""
        } ${isFilled ? "text-yellow-500" : "text-gray-400"}`}
        onClick={handleClick}
      >
        &#9733;
      </span>
    );
  });

  return <div className="flex">{stars}</div>;
};

export default StarRating;
