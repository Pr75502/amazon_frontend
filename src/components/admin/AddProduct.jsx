import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../features/productSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const nameRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: nameRef.current.value,
      price: priceRef.current.value,
      category: categoryRef.current.value,
    };

    try {
      await dispatch(addProduct(productData)).unwrap();
      toast.success("Product added successfully");
      navigate("/admin/products");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>

      <form onSubmit={handleSubmit} className="max-w-md">
        <input
          className="w-full p-2 border mb-3"
          placeholder="Name"
          ref={nameRef}
        />
        <input
          className="w-full p-2 border mb-3"
          placeholder="Price"
          ref={priceRef}
        />
        <input
          className="w-full p-2 border mb-3"
          placeholder="Category"
          ref={categoryRef}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
