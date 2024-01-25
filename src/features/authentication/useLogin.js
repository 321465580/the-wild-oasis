import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    // 成功是可以拿到返回的数据
    onSuccess: (user) => {
      // 手动设置缓存的数据
      queryClient.setQueryData(["user"], user.user);
      toast.success("登录成功");
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("邮箱或者密码不正确");
    },
  });

  return { login, isLoading };
}
