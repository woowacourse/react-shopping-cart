import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { cartListState } from '../store/cart';
import { CartItemType, ProductItemType } from '../types';

const useCartList = () => {
  const [cartItem, setCartItemList] = useRecoilState(cartListState);

  const fetchCartList = useCallback(async () => {
    const response = await fetch('/cart-items');
    const cartItems = await response.json();
    return cartItems.map((item: CartItemType) => {
      return {
        ...item,
        isChecked: true,
      };
    });
  }, []);

  const removeCheckedItems = useCallback(async () => {
    cartItem.forEach(async (item) => {
      if (item.isChecked === true) {
        await fetch(`/cart-items/${item.id}`, { method: 'DELETE' });
      }
    });

    const updatedCartItems = cartItem.filter((item) => !item.isChecked);
    setCartItemList(updatedCartItems);
  }, [cartItem, setCartItemList]);

  const removeSelectedItem = useCallback(
    async (itemId: number) => {
      await fetch(`/cart-items/${itemId}`, { method: 'DELETE' });

      const updatedCartItems = cartItem.filter((item) => item.id !== itemId);
      setCartItemList(updatedCartItems);
    },
    [cartItem, setCartItemList]
  );

  const getCheckedList = () => {
    return cartItem.filter((item: CartItemType) => item.isChecked);
  };

  const resetCartCheckStatusToTrue = () => {
    setCartItemList(
      cartItem.map((item) => {
        return {
          ...item,
          isChecked: true,
        };
      })
    );
  };

  const resetCartCheckStatusToFalse = () => {
    setCartItemList(
      cartItem.map((item) => {
        return {
          ...item,
          isChecked: false,
        };
      })
    );
  };

  const reverseCheckCartItem = (cartId: number) => {
    setCartItemList(
      cartItem.map((item) => {
        if (cartId === item.id) {
          return {
            ...item,
            isChecked: !item.isChecked,
          };
        }
        return item;
      })
    );
  };

  const getCartItemSum = () => {
    return cartItem.reduce((acc, item) => {
      if (item.isChecked) return acc + item.quantity * item.product.price;
      return acc;
    }, 0);
  };

  const fetchProductAddToCart = useCallback(
    async (information: ProductItemType, itemQuantity: number) => {
      const response = await fetch('/cart-items');

      if (response.ok) {
        const isExistItem = cartItem.find((item) => item.product.id === information.id);
        if (isExistItem) {
          const newCartItem = cartItem.map((item) => {
            if (item.product.id === information.id) {
              return {
                ...item,
                quantity: item.quantity + itemQuantity,
              };
            }
            return item;
          });
          setCartItemList(newCartItem);
        } else {
          const newCartItem = [
            ...cartItem,
            {
              id: Number(new Date()),
              product: information,
              quantity: itemQuantity,
              isChecked: true,
            },
          ];
          setCartItemList(newCartItem);
        }
      }
    },
    [cartItem, setCartItemList]
  );

  const updateCartItemQuantity = async (itemId: number, updateQuantity: number) => {
    const response = await fetch(`/cart-items/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        quantity: updateQuantity,
      }),
    });

    if (response.ok) {
      const newItemData = cartItem.map((item: CartItemType) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: updateQuantity,
          };
        }
        return item;
      });
      setCartItemList(newItemData);
    }
  };

  return {
    fetchCartList,
    removeCheckedItems,
    removeSelectedItem,
    getCheckedList,
    resetCartCheckStatusToTrue,
    resetCartCheckStatusToFalse,
    reverseCheckCartItem,
    getCartItemSum,
    fetchProductAddToCart,
    updateCartItemQuantity,
  };
};

export default useCartList;
