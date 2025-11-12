const StatsCard = ({ title, value }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full sm:w-60">
      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  );
};

export default StatsCard;
