import { FooterButton } from '@/f_shared';

// TODO: Add OnClickHandler
export const PayOrderButton = () => {
  // TODO: Connect to disable state
  // const disabled = useRecoilValue(OrderConfirmButtonDisabledState);
  const disabled = false; // temp

  return (
    <FooterButton disabled={disabled} onClick={() => {}}>
      결제하기
    </FooterButton>
  );
};
