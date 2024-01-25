import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export function useCheckin() {
  const queryClient = useQueryClient();

  const { mutate: checkin, isLoading: isChecking } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`订单 #${data.id}成功入住`);
      //  使得所有的 query 数据无效
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("订单入住发生错误");
    },
  });

  return { checkin, isChecking };
}
