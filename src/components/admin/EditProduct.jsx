import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct, updateProduct } from "../../features/productSlice";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();   
  const navigate = useNavigate();

  const { singleProduct, error } = useSelector((state) => state.product);

  const nameRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();

  // ✅ Fetch product by ID when page loads
  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  // ✅ Fill form with product data
  useEffect(() => {
    if (singleProduct) {
      nameRef.current.value = singleProduct.name;
      descriptionRef.current.value = singleProduct.description;
      priceRef.current.value = singleProduct.price;
      categoryRef.current.value = singleProduct.category;
    }
  }, [singleProduct]);

  // ✅ Handle Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      price: priceRef.current.value,
      category: categoryRef.current.value,
    };

    try {
      await dispatch(updateProduct({ id, ...updatedData })).unwrap();
      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      toast.error(err.message || "Update failed");
    }
  };

  if (error === "loading...") return <p>Loading product...</p>;
  if (!singleProduct) return <p>Product not found.</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          ref={nameRef}
          placeholder="Product Name"
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          ref={descriptionRef}
          placeholder="Description"
          className="w-full p-2 border rounded"
          required
        ></textarea>

        <input
          type="number"
          ref={priceRef}
          placeholder="Price"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          ref={categoryRef}
          placeholder="Category"
          className="w-full p-2 border rounded"
          required
        />

              <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
             
              >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
