import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClinet = useQueryClient();

  // React query 调用删除函数
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    // 删除成功后重新获取数据
    // queryClient 让 cabins 的数据失效
    onSuccess: () => {
      toast.success("删除成功");
      queryClinet.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isDeleting, deleteCabin };
}
