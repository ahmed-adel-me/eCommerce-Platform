function DashboardCard({ title, count, description }) {
  return (
    <div className="bg-white rounded-md p-5 flex flex-col justify-center items-center gap-3 flex-1">
      <p className="text-gray-600 font-semibold uppercase text-xl">{title}</p>
      <p className="text-6xl text-blue-800">{count}</p>
      <p className="text-lg text-gray-500">{description}</p>
    </div>
  );
}

export default DashboardCard;
