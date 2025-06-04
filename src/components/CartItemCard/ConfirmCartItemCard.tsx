import Text from "../@common/Text/Text";
import CartItemCard from "./CartItemCard";

interface ConfirmCartItemCardProps {
  imgUrl: string;
  name: string;
  price: number;
  quantity: number;
}

const ConfirmCartItemCard = ({
  imgUrl,
  name,
  price,
  quantity,
}: ConfirmCartItemCardProps) => {
  return (
    <CartItemCard
      imgUrl={imgUrl}
      name={name}
      price={price}
      quantityContent={<Text text={`${quantity}개`} />}
    />
  );
};

export default ConfirmCartItemCard;
