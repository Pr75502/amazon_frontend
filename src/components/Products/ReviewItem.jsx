import React, { useState, useEffect } from "react";
import StarRating from "./StarRating";
import axios from "../../api/axios"; // Assuming you have a pre-configured axios instance

const ReviewItem = ({ review, user, onEdit, onDelete }) => {
  const [authorName, setAuthorName] = useState("Anonymous");

  useEffect(() => {
    // WORKAROUND: This is inefficient. Ideally, the backend should populate the user's name.
    // This code assumes you have an API endpoint like GET /api/users/:id
    const fetchAuthorName = async () => {
      try {
        // The review object from the API has review.user as a string ID.
        const response = await axios.get(`/users/${review.user}`);
        if (response.data && response.data.data.name) {
          setAuthorName(response.data.data.name);
        }
      } catch (error) {
        console.error("Failed to fetch review author name", error);
        // Keep the name as "Anonymous" if the fetch fails
      }
    };

    if (review.user) {
      fetchAuthorName();
    }
  }, [review.user]);

  const isAuthor = user && user._id === review.user;

  return (
    <div className="border-b py-4">
      <div className="flex items-center mb-2">
        <div className="font-bold mr-2">{authorName}</div>
        <StarRating rating={review.rating} />
      </div>
      <p>{review.comment}</p>
      {isAuthor && (
        <div className="flex mt-2">
          <button
            onClick={() => onEdit(review)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(review._id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
