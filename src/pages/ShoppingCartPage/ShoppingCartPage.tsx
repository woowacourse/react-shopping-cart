import Header from "../../components/layout/Header/Header";
import ErrorBox from "../../components/common/ErrorBox/ErrorBox";

import useCartItemList from "../../hooks/useCartItemList";

import * as S from "./ShoppingCartPage.styles";
import { useErrorContext } from "../../contexts/ErrorContext";
import ShoppingCartContent from "../../components/shoppingCart/ShoppingCartContent/ShoppingCartContent";

export default function ShoppingCartPage() {
  const { state, cartItemList, patchCartItem, removeCartItem } =
    useCartItemList();
  const { errorMessage } = useErrorContext();

  if (state.isLoading) {
    return <div>로딩중..</div>;
  }

  return (
    <>
      <Header>SHOP</Header>
      <S.ShoppingCart>
        {errorMessage && <ErrorBox />}
        <ShoppingCartContent
          cartItemList={cartItemList}
          patchCartItem={patchCartItem}
          removeCartItem={removeCartItem}
        />
      </S.ShoppingCart>
    </>
  );
}

// const ShoppingCartContent = ({
//   cartItemList,
//   patchCartItem,
//   removeCartItem,
// }) => {
//   const [cartItemCheckList, setCartItemCheckList] = useState<CartItemCheck[]>(
//     cartItemList.map((item) => ({
//       id: item.id,
//       quantity: item.quantity,
//       price: item.product.price,
//       isClicked: true,
//     }))
//   );

//   const handleSelectedCartItem = (id: number) => {
//     setCartItemCheckList((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, isClicked: !item.isClicked } : item
//       )
//     );
//   };

//   const handleSelectedCartItemRemove = async (id: number) => {
//     await removeCartItem(id);
//     setCartItemCheckList((prev) => prev.filter((item) => item.id !== id));
//   };

//   const handleSelectedCartItemQuantityUpdate = async (
//     id: number,
//     quantity: number
//   ) => {
//     await patchCartItem(id, quantity);
//     setCartItemCheckList((prev) =>
//       prev.map((item) => (item.id === id ? { ...item, quantity } : item))
//     );
//   };

//   const allChecked = cartItemCheckList.every((item) => item.isClicked);
//   const toggleAll = () => {
//     setCartItemCheckList((prev) =>
//       prev.map((item) => ({ ...item, isClicked: !allChecked }))
//     );
//   };

//   const cartItemCheckListTotalQuantity = cartItemCheckList
//     .filter((item) => item.isClicked)
//     .reduce((acc, item) => acc + item.quantity, 0);

//   const cartItemListLength = cartItemList.length;

//   const selectedCartItemList = cartItemCheckList.filter(
//     ({ isClicked }) => isClicked
//   );

//   const allProductPrice = selectedCartItemList.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   const shippingFee = allProductPrice >= 100000 ? 0 : 3000;
//   const totalPrice = allProductPrice + shippingFee;

//   const navigate = useNavigate();
//   const handleOrderCheckButtonClick = () => {
//     navigate("/order-check", {
//       state: {
//         checkedProductsLength: selectedCartItemList.length,
//         cartItemCheckListTotalQuantity,
//         totalPrice,
//       },
//     });
//   };

//   if (!cartItemListLength) {
//     return <S.EmptyText>장바구니에 담은 상품이 없습니다.</S.EmptyText>;
//   }

//   return (
//     <>
//       <ShoppingCartHeader
//         title="장바구니"
//         description={`현재 ${selectedCartItemList.length}종류의 상품이 담겨있습니다.`}
//       />
//       <ShoppingCartList
//         cartItemList={cartItemList}
//         cartItemCheckList={cartItemCheckList}
//         allChecked={allChecked}
//         toggleAll={toggleAll}
//         handleSelectedCartItem={handleSelectedCartItem}
//         handleSelectedCartItemQuantityUpdate={
//           handleSelectedCartItemQuantityUpdate
//         }
//         handleSelectedCartItemRemove={handleSelectedCartItemRemove}
//       />
//       <Receipt allProductPrice={allProductPrice} shippingFee={shippingFee} />
//       <Footer
//         text="주문 확인"
//         active={cartItemListLength ? "true" : "false"}
//         handleClick={handleOrderCheckButtonClick}
//       />
//     </>
//   );
// };
