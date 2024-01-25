import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("用户被更新了");

      queryClient.setQueryData(["user"], user);

      // 让数据过期
      //   queryClient.invalidateQueries({
      //     queryKey: ["user"],
      //   });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateUser, isUpdating };
}
