import * as Styled from './ItemCouponButton.styled';

export type ItemCouponButtonType = React.FC<React.PropsWithChildren & React.ButtonHTMLAttributes<HTMLButtonElement>>;

const ItemCouponButton: ItemCouponButtonType = ({ children, ...props }) => {
  return <Styled.ItemCouponButton {...props}>{children}</Styled.ItemCouponButton>;
};

export default ItemCouponButton;
