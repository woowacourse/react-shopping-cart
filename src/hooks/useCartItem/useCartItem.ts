import { CartItemApi, DeleteCartItemsParams, PatchCartItemsParams, PostCartItemsParams, ProductApi } from "@/apis";
import { useError } from "@/context";
import { useMutation, useQuery } from "@/modules/Query";
import { optimisticDecreaseCartItem, optimisticDeleteCartItem, optimisticIncreaseCartItem } from "./utils";

export default function useCartItem() {
  const { data: products, status: productsStatus } = useQuery({
    queryFn: ProductApi.getAllProducts,
    queryKey: "products",
  });

  const {
    data: cartItems,
    status: cartItemsStatus,
    refetch: refetchCartItems,
  } = useQuery({
    queryFn: CartItemApi.getCartItems,
    queryKey: "cartItems",
    initialData: { content: [] },
  });

  const { showError, error } = useError();

  const { mutate: mutatePostCartItem, status: postCartItemStatus } = useMutation<PostCartItemsParams, void>({
    mutationFn: CartItemApi.postCartItems,
  });
  const { mutate: mutatePatchCartItem, status: patchCartItemStatus } = useMutation<PatchCartItemsParams, void>({
    mutationFn: CartItemApi.patchCartItems,
  });
  const { mutate: mutateDeleteCartItem, status: deleteCartItemStatus } = useMutation<DeleteCartItemsParams, void>({
    mutationFn: CartItemApi.deleteCartItems,
  });

  const increaseCartItem = async (productId: number) => {
    if (error) return;

    const cartItem = cartItems?.content.find((item) => item.product.id === productId);

    const product = products?.content.find((item) => item.id === productId);
    if (!product) return;

    if (!cartItem) {
      await mutatePostCartItem(
        { productId },
        { onError: () => showError({ type: "server", message: "재고가 부족합니다." }) },
      );
      await refetchCartItems();
    } else {
      mutatePatchCartItem(
        {
          cartItemId: cartItem.id,
          quantity: cartItem.quantity + 1,
        },
        {
          onMutate: () => optimisticIncreaseCartItem(productId),
          onError: () => {
            refetchCartItems();
            showError({ type: "server", message: "재고가 부족합니다." });
          },
        },
      );
    }
  };

  const decreaseCartItem = async (productId: number) => {
    if (error) return;

    const cartItem = cartItems?.content.find((item) => item.product.id === productId);

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
            showError({ type: "server", message: "재고가 부족합니다." });
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
    productsStatus,
    cartItemsStatus,
    products,
    cartItems,
    postCartItemStatus,
    patchCartItemStatus,
    deleteCartItemStatus,
    refetchCartItems,
  };
}
