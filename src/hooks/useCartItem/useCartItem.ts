import {
  useCartItemDeleteMutation,
  useCartItemPatchMutation,
  useCartItemPostMutation,
  useCartItemQuery,
  useProductQuery,
} from "@/hooks";
import { optimisticDecreaseCartItem, optimisticDeleteCartItem, optimisticIncreaseCartItem } from "./utils";
import { useToast } from "@/modules";
import { ERROR_MESSAGE } from "@/constants";

export default function useCartItem() {
  const { data: cartItems, refetch: refetchCartItems } = useCartItemQuery();
  const { data: products } = useProductQuery();

  const { showToast } = useToast();

  const { mutate: mutatePostCartItem, status: postCartItemStatus } = useCartItemPostMutation();
  const { mutate: mutatePatchCartItem, status: patchCartItemStatus } = useCartItemPatchMutation();
  const { mutate: mutateDeleteCartItem, status: deleteCartItemStatus } = useCartItemDeleteMutation();

  const increaseCartItem = async (productId: number) => {
    const cartItem = cartItems.content.find((item) => item.product.id === productId);

    const product = products.content.find((item) => item.id === productId);
    if (!product) return;

    if (!cartItem) {
      await mutatePostCartItem(
        { productId },
        {
          onError: () => showToast({ variant: "error", message: ERROR_MESSAGE.api }),
        },
      );
      refetchCartItems();
    } else {
      if (cartItem.quantity >= product.stock) {
        showToast({
          variant: "error",
          message: "최대 수량을 초과했습니다.",
        });
        return;
      }

      mutatePatchCartItem(
        {
          cartItemId: cartItem.id,
          quantity: cartItem.quantity + 1,
        },
        {
          onMutate: () => optimisticIncreaseCartItem(productId),
          onError: () => {
            refetchCartItems();
            showToast({
              variant: "error",
              message: ERROR_MESSAGE.api,
            });
          },
        },
      );
    }
  };

  const decreaseCartItem = async (productId: number) => {
    const cartItem = cartItems.content.find((item) => item.product.id === productId);

    if (!cartItem) return;
    optimisticDecreaseCartItem;

    if (cartItem.quantity === 1) {
      await mutateDeleteCartItem(
        { cartItemId: cartItem.id },
        {
          onMutate: () => optimisticDeleteCartItem(cartItem.id),
        },
      );
    } else {
      await mutatePatchCartItem(
        {
          cartItemId: cartItem.id,
          quantity: cartItem.quantity - 1,
        },
        {
          onMutate: () => optimisticDecreaseCartItem(productId),
          onError: () => {
            refetchCartItems();
            showToast({ variant: "error", message: ERROR_MESSAGE.api });
          },
        },
      );
    }
  };

  const deleteCartItem = async (cartItemId: number) => {
    await mutateDeleteCartItem(
      { cartItemId },
      {
        onMutate: () => optimisticDeleteCartItem(cartItemId),
      },
    );
  };

  return {
    increaseCartItem,
    decreaseCartItem,
    deleteCartItem,
    postCartItemStatus,
    patchCartItemStatus,
    deleteCartItemStatus,
  };
}
