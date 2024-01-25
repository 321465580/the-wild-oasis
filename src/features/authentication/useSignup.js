import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success("注册用户成功");
      navigate("/login");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("注册用户失败");
    },
  });

  return { signup, isLoading };
}
