import { useEffect, useRef } from "react";
import { addProduct, deleteProduct } from "../../features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { myProducts } from "../../features/productSlice";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const AddProductUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();
  const imageUrlRef = useRef();

  useEffect(() => {
    dispatch(myProducts());
  }, [dispatch]);

  const myProductsData = useSelector((state) => state.product.myProducts);
  console.log(myProductsData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("price", priceRef.current.value);
    formData.append("category", categoryRef.current.value);
    formData.append("image", imageUrlRef.current.files[0]);
    console.log(formData);

    try {
      await dispatch(addProduct(formData)).unwrap();
      toast.success("Product added successfully");
      // navigate("/homepage");
      nameRef.current.value = "";
      descriptionRef.current.value = "";
      priceRef.current.value = "";
      categoryRef.current.value = "";
      imageUrlRef.current.value = "";
    } catch (error) {
      toast.error(error.message || "Failed to add product");
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error(error.message || "Failed to delete product");
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Add Product
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
          <input
            type="file"
            placeholder="Product Image"
            ref={imageUrlRef}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
          >
            <FaPlus /> Add Product
          </button>
        </form>

        <h1 className="text-xl font-bold text-center text-gray-800 my-8">
          Products Added
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myProductsData &&
            myProductsData.map((product) => {
              return (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-lg p-4"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div class="p-4">
                    <h1 class="text-lg font-bold">{product.name}</h1>
                    <p class="text-gray-600">{product.description}</p>
                    <p class="text-gray-800 font-bold mt-2">
                      ${product.price}
                    </p>
                    <p class="text-sm text-gray-500 mt-1">
                      {product.category}
                    </p>
                    <button
                      onClick={() => navigate(`/edit-product/${product._id}`)}
                      className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mt-2 flex items-center justify-center gap-2"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mt-2 flex items-center justify-center gap-2"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default AddProductUser;
