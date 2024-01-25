import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

export function useCheckout() {
  const queryClient = useQueryClient();
  const navgiate = useNavigate();

  const { mutate: checkout, isLoading: isCheckouting } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`订单 #${data.id}成功退房`);
      //  使得所有的 query 数据无效
      queryClient.invalidateQueries({ active: true });
      navgiate("/");
    },
    onError: () => {
      toast.error("订单入住发生错误");
    },
  });

  return { checkout, isCheckouting };
}
