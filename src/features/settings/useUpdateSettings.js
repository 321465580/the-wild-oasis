import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdateLoading, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("设置更新成功");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: () => {
      toast.error("设置更新失败");
    },
  });
  return { isUpdateLoading, updateSetting };
}
