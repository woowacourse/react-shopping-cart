import * as Styled from './style';
interface OrderButtonProp {
  isOrderable: boolean;
  onClick: () => void;
  label: string;
}

const OrderButton = ({ onClick, label, isOrderable }: OrderButtonProp) => {
  return (
    <Styled.OrderButton
      onClick={() => onClick}
      $isOrderable={isOrderable}
      disabled={!isOrderable}
    >
      {label}
    </Styled.OrderButton>
  );
};

export default OrderButton;
