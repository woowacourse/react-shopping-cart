import * as Styled from './style';
interface OrderButtonProp {
  isOrderable: boolean;
  label: string;
  onClick: () => void;
}

const OrderButton = ({ label, isOrderable, onClick }: OrderButtonProp) => {
  return (
    <Styled.OrderButton
      onClick={() => onClick()}
      $isOrderable={isOrderable}
      disabled={!isOrderable}
    >
      {label}
    </Styled.OrderButton>
  );
};

export default OrderButton;
