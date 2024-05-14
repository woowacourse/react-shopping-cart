import * as Styled from './style';
interface OrderButtonProp {
  onClick: () => void;
  label: string;
  isOrderable: boolean;
}

const OrderButton = ({ isOrderable, onClick, label }: OrderButtonProp) => {
  return (
    <Styled.OrderButton
      onClick={() => onClick}
      $isOrderable={isOrderable}
      disabled={!isOrderable}
      type="button"
    >
      {label}
    </Styled.OrderButton>
  );
};

export default OrderButton;
