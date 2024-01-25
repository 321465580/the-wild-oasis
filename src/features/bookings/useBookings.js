import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constans";

export function useBookings() {
  const queryClient = useQueryClient();
  // 提前和 url 的过滤信息去请求数据
  const [searchParams] = useSearchParams();

  // 过滤：拿到过滤的参数
  const filterValue = searchParams.get("status");
  // 定义过滤的值
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
        };
  // {
  //   field: "totalPrice",
  //   value: 1000,
  //   method: "gte",
  // };

  // 排序
  // 根据 url 中的路径拿到搜索的条件
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // 分页
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  // 请求
  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    // 用于在整个程序中重新获取数据、缓存和共享查询的唯一键，是一个数组
    // filter 改变重新请求数据
    queryKey: ["bookings", filter, sortBy, page],
    // 请求函数
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // pre-fetching
  const pageCount = Math.ceil(bookings?.count / PAGE_SIZE);
  // 提前加载下一页的数据
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      // 请求函数
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      // 请求函数
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { bookings, isLoading, error };
}
