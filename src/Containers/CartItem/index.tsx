import React, {
  VFC,
  useState,
  ChangeEvent,
  EventHandler,
  MouseEvent,
} from "react";
import { Link } from "react-router-dom";
import { ProductImage, CheckBox } from "../../Components";

interface ICartItemProps {
  id: string;
  name: string;
  price: string;
  onClickDeleteButton: EventHandler<MouseEvent>;
}

const CartItem: VFC<ICartItemProps> = ({
  id,
  name,
  price,
  onClickDeleteButton,
}) => {
  const [selected, setSelected] = useState<boolean>(false);

  const onChangeSelected = () => {
    setSelected((prev) => !prev);
  };

  return (
    <li>
      <div>
        <CheckBox checked={selected} onChange={onChangeSelected} />
      </div>
      <Link to={`/cart/${id}`}>
        <ProductImage
          size="7.75rem"
          src="http://via.VFCholder.com/282x282"
          alt="dummy"
        />
      </Link>
      <Link to={`/cart/${id}`}>{name}</Link>
      <div>
        <div>삭제 버튼</div>
        <div>
          <input type="number" min="1" max="100" />
          <div>
            <button>위</button>
            <button>아래</button>
          </div>
        </div>
        <div>{price}</div>
      </div>
    </li>
  );
};

export default CartItem;
export { ICartItemProps };
