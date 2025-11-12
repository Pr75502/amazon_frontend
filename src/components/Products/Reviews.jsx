import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchReviews, deleteReview } from "../../features/reviewSlice";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";
import { toast } from "react-hot-toast";

const Reviews = ({ productId }) => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.reviews);
  const { user } = useSelector((state) => state.user);
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    if (productId) {
      dispatch(fetchReviews(productId));
    }
  }, [dispatch, productId]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteReview(id)).unwrap();
      toast.success("Review deleted successfully");
    } catch (error) {
      toast.error(error.message || "Failed to delete review");
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review);
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
  };

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      {reviews && reviews.length > 0 ? (
        reviews.map((review) =>
          editingReview && editingReview._id === review._id ? (
            <ReviewForm
              key={review._id}
              productId={productId}
              review={editingReview}
              onCancel={handleCancelEdit}
            />
          ) : (
            <ReviewItem
              key={review._id}
              review={review}
              user={user}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )
        )
      ) : (
        <div>No reviews yet.</div>
      )}
    </div>
  );
};

export default Reviews;
