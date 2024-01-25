import { useQuery } from "@tanstack/react-query";

import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    data: cabins,
    isLoading,
    error,
  } = useQuery({
    // 用于在整个程序中重新获取数据、缓存和共享查询的唯一键，是一个数组
    queryKey: ["cabins"],
    // 请求函数
    queryFn: getCabins,
  });

  return { cabins, isLoading, error };
}
