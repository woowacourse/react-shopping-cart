import * as Styled from './style';
interface OrderButtonProp {
  isOrderable: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

const OrderButton = ({ children, isOrderable, onClick }: OrderButtonProp) => {
  return (
    <Styled.OrderButton
      onClick={() => onClick()}
      $isOrderable={isOrderable}
      disabled={!isOrderable}
    >
      {children}
    </Styled.OrderButton>
  );
};

export default OrderButton;
