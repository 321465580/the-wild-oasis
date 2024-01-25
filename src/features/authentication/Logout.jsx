import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
  const { logout, isLoading } = useLogout();

  return (
    <ButtonIcon onClick={logout} disabled={isLoading}>
      {!isLoading ? <HiArrowLeftOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
