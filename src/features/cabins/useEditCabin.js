import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createEditCabin } from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isEditLoading, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("小木屋修改成功");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: () => {
      toast.error("创建失败");
    },
  });
  return { isEditLoading, editCabin };
}
