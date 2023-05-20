import { useState } from 'react';
import { useProductListInCart } from '../../hooks/cartListState/cartListState';
import { FlexColWrapper, FlexWrapper } from '../../pages/Cart/Cart.style';
import CartItemBox from '../CartItemBox/CartItemBox';

function CartItemListContainer() {
  const productListInCart = useProductListInCart();

  interface ToggleMap {
    [id: string]: boolean;
  }

  const [toggleMap, setToggleMap] = useState<{
    [id: string]: boolean;
  }>(() => {
    return productListInCart.reduce((acc, { id }) => {
      acc[id] = true;
      return acc;
    }, {} as ToggleMap);
  });

  const handleAllToggle = () => {
    const isAllChecked = [...Object.values(toggleMap)].every((isChecked) => isChecked);

    setToggleMap(
      [...Object.keys(toggleMap)].reduce((acc, id) => {
        acc[id] = !isAllChecked;
        return acc;
      }, {} as ToggleMap)
    );
  };

  const setToggle = (id: number) => {
    return setToggleMap((prevMap) => {
      return {
        ...toggleMap,
        [id]: !prevMap[id],
      };
    });
  };

  const toggleCount = [...Object.values(toggleMap)].reduce((acc, value) => {
    if (value) {
      return acc + 1;
    }

    return acc;
  }, 0);

  const productCount = productListInCart.length;

  const isChecked = productCount === toggleCount;

  return (
    <FlexColWrapper>
      <span>상품 개수: {productCount}</span>
      {productListInCart.map(({ id, imageUrl, name, price }) => {
        return (
          <li key={id}>
            <CartItemBox
              id={id}
              imageUrl={imageUrl}
              name={name}
              price={price}
              toggle={toggleMap[id]}
              setToggle={() => {
                setToggle(id);
              }}
            />
          </li>
        );
      })}
      <FlexWrapper>
        <input
          type="checkbox"
          checked={isChecked}
          onClick={() => {
            handleAllToggle();
          }}
          readOnly
        />
        <span>전체선택{toggleCount}</span>
        <button>선택삭제</button>
      </FlexWrapper>
    </FlexColWrapper>
  );
}

export default CartItemListContainer;
