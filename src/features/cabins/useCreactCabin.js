import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  // react query 处理创建和编辑的逻辑
  const { isLoading: isCreateLoading, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("创建成功");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      //  reset();
    },
    onError: () => {
      toast.error("创建失败");
    },
  });

  return { isCreateLoading, createCabin };
}
