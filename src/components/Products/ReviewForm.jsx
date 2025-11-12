import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addReview, updateReview } from "../../features/reviewSlice";
import { toast } from "react-hot-toast";
import StarRating from "./StarRating";

const ReviewForm = ({ productId, review, onCancel }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (review) {
      setRating(review.rating);
      setComment(review.comment);
    }
  }, [review]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (review) {
        await dispatch(
          updateReview({ id: review._id, rating, comment })
        ).unwrap();
        toast.success("Review updated successfully");
      } else {
        await dispatch(addReview({ productId, rating, comment })).unwrap();
        toast.success("Review submitted successfully");
      }
      setRating(0);
      setComment("");
      if (onCancel) {
        onCancel();
      }
    } catch (error) {
      toast.error(error.message || "Failed to submit review");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">
        {review ? "Edit Review" : "Write a Review"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-bold mb-2">Rating</label>
          <StarRating rating={rating} onRatingChange={setRating} />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Comment</label>
          <textarea
            className="w-full p-2 border rounded"
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="flex">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {review ? "Update Review" : "Submit Review"}
          </button>
          {review && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
