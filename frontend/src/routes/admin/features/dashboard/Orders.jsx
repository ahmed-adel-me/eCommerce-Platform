import DashboardCard from "./DashboardCard";
import useOrderCount from "./useOrderCount";

function Orders() {
  const { data } = useOrderCount();
  const { dailyCount, weeklyCount, monthlyCount } = data;
  return (
    <div className="my-10">
      <h2 className="text-2xl">Orders</h2>
      <div className="flex mt-5 gap-10">
        <DashboardCard
          title={"Today"}
          count={dailyCount}
          description={`${dailyCount} orders today`}
        />
        <DashboardCard
          title={"this week"}
          count={weeklyCount}
          description={`${weeklyCount} orders this week`}
        />
        <DashboardCard
          title={"this month"}
          count={monthlyCount}
          description={`${monthlyCount} orders this month`}
        />
      </div>
    </div>
  );
}

export default Orders;
