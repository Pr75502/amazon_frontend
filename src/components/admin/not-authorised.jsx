import { useNavigate } from "react-router-dom";

const NotAuthorized = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/"); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md w-full">
        <h1 className="text-5xl font-bold text-red-600 mb-4">403</h1>

        <h2 className="text-2xl font-semibold mb-3 text-gray-800">
          Access Denied
        </h2>

        <p className="text-gray-600 mb-6">
          You don’t have permission to view this page.
        </p>

        <button
          onClick={goHome}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotAuthorized;
