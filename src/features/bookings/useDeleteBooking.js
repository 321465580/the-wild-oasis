import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClinet = useQueryClient();

  // React query 调用删除函数
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    // 删除成功后重新获取数据
    // queryClient 让 cabins 的数据失效
    onSuccess: () => {
      toast.success("删除订单成功");

      queryClinet.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isDeleting, deleteBooking };
}
