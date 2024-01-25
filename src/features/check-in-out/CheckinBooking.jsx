import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { booking, isLoading } = useBooking(false);
  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  const moveBack = useMoveBack();

  const [confirmPaid, setConfirmPaid] = useState();

  const [addBreakfast, setAddBreakfast] = useState(false);

  const { checkin, isChecking } = useCheckin();

  // 获取设置的早餐值
  const { settings, isLoading: isLoadingSettings } = useSettings();

  if (isLoading) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionsBreakfastPrice =
    settings?.breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      // 如果添加了早餐，后端就得设置早餐为 true 改变总价
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionsBreakfastPrice,
          totalPrice: totalPrice + optionsBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            // disabled={confirmPaid || isChecking}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
          >
            是否想要早餐呀 ({optionsBreakfastPrice})?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id="confirm"
          checked={confirmPaid}
          disabled={confirmPaid || isChecking}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
        >
          确定{guests.fullName}已经支付
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionsBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionsBreakfastPrice
              )})`}
          。
        </Checkbox>
      </Box>

      <ButtonGroup>
        {/* disabled 支付了才能入住，不支付不能入住 */}
        <Button disabled={!confirmPaid || isChecking} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
