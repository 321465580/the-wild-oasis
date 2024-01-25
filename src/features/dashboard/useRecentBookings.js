import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  // 拿到 url 中 的参数
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  // 对日期进行删减
  const queryDate = subDays(new Date(), numDays).toISOString();
  // 使用 usequery 获取数据
  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { isLoading, bookings };
}
