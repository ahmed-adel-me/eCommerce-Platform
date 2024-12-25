import DashboardCard from "./DashboardCard";
import useOrderCount from "./useOrderCount";
import useRevenue from "./useRevenue";

function Revenue() {
  const { data: orders } = useOrderCount();
  const { data: revenue } = useRevenue();
  const { dailyRevenue, weeklyRevenue, monthlyRevenue } = revenue;
  const { dailyCount, weeklyCount, monthlyCount } = orders;

  return (
    <div className="my-10">
      <h2 className="text-2xl">Revenue</h2>
      <div className="flex mt-5 gap-10">
        <DashboardCard
          title={"Today"}
          count={`$${dailyRevenue}`}
          description={`${dailyCount} orders today`}
        />
        <DashboardCard
          title={"this week"}
          count={`$${weeklyRevenue}`}
          description={`${weeklyCount} orders this week`}
        />
        <DashboardCard
          title={"this month"}
          count={`$${monthlyRevenue}`}
          description={`${monthlyCount} orders this month`}
        />
      </div>
    </div>
  );
}

export default Revenue;
