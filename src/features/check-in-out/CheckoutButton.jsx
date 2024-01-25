import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckouting } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckouting}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
