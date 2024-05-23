import { FooterButton } from '@/f_shared';

// TODO: Add OnClickHandler
export const OrderCartButton = () => {
  // TODO: Connect to disable state
  // const disabled = useRecoilValue(OrderConfirmButtonDisabledState);
  const disabled = false; // temp

  return (
    <FooterButton disabled={disabled} onClick={() => {}}>
      주문 확인
    </FooterButton>
  );
};
