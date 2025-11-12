import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { productDetails, updateProduct } from "../../features/productSlice";

const EditProductUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const nameRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();

  const { details } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(productDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (details) {
      nameRef.current.value = details.name || "";
      descriptionRef.current.value = details.description || "";
      priceRef.current.value = details.price || "";
      categoryRef.current.value = details.category || "";
    }
  }, [details]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      price: priceRef.current.value,
      category: categoryRef.current.value,
    };

    try {
      await dispatch(updateProduct({ id, ...productData })).unwrap();
      toast.success("Product updated successfully");
      navigate("/addproduct");
    } catch (error) {
      toast.error(error.message || "Failed to update product");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Edit Product
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            ref={nameRef}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Product Description"
            ref={descriptionRef}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Product Price"
            ref={priceRef}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Product Category"
            ref={categoryRef}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductUser;
