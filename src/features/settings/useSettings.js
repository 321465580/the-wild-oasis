import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    isLoading,
    err,
    data: settings,
  } = useQuery({
    // 用于在整个程序中重新获取数据、缓存和共享查询的唯一键，是一个数组
    queryKey: ["settings"],
    // 请求函数
    queryFn: getSettings,
  });

  return { isLoading, err, settings };
}
