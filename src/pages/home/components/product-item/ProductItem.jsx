import { useDispatch, useSelector } from "react-redux";
import StarcraftLogo from "../../../../assets/images/gardiun.png";
import Cart from "../../../../assets/images/cart.svg";
import S from "../../styled";
import Thumbnail from "../thumbnail/Thumbnail";
import ImageButton from "../image-button/ImageButton";
import createAction from "../../../../redux/createAction";
import { ADD_PRODUCT_TO_CART } from "../../../../redux/actions";

function ProductItem({ id, name, price, stock }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const existInCart = (cart, id) => {
    const isInclude = Object.keys(cart).includes(id);
    return isInclude;
  };

  const handleClick = () => {
    dispatch(createAction(ADD_PRODUCT_TO_CART, id));
  };

  return (
    <S.ProductItem>
      <Thumbnail src={StarcraftLogo} />
      <div className="content">
        <div className="product-detail">
          <div className="l-left">
            <div className="product-title">{name}</div>
            <div className="product-price">{price}원</div>
          </div>
          <div className="l-right">
            {stock > 0 && (
              <ImageButton
                onClick={handleClick}
                included={existInCart(cart, id)}
              >
                <Cart width="36px" height="36px" fill="#00cc00" />
              </ImageButton>
            )}
          </div>
        </div>
      </div>
      <div className="overlay" />
    </S.ProductItem>
  );
}

export default ProductItem;
