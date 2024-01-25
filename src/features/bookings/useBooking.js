import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();

  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    // 用于在整个程序中重新获取数据、缓存和共享查询的唯一键，是一个数组
    queryKey: ["booking", bookingId],
    // 请求函数
    queryFn: () => getBooking(bookingId),
    // 默认会请求三次，设置这个属性不用重试
    retry: false,
  });

  return { booking, isLoading, error };
}
