import { useState } from "react";
import { ReactComponent as ShoppingCart } from "../../../assets/image/cart.svg";

const ShoppingCartIcon = ({
  hover,
  basicColor,
  ...props
}: {
  hover?: string;
  width: string;
  height?: string;
  basicColor?: string;
  fill?: string;
}) => {
  const [isHover, setHover] = useState(false);

  return (
    <ShoppingCart
      fill={isHover ? hover : basicColor}
      {...props}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    />
  );
};

export default ShoppingCartIcon;
