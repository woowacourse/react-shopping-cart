import { DeleteCartItemsParams, PatchCartItemsParams } from "@/apis/CartItemApi";

import { CartItemApi, ProductApi } from "@/apis";

import { PostCartItemsParams } from "@/apis/CartItemApi";
import { useMutation, useQuery } from "@/modules";
import { GetCartItemsResponse } from "@/types";

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
  });

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
    const cartItem = cartItems?.content.find((item) => item.product.id === productId);

    const product = products?.content.find((item) => item.id === productId);
    if (!product) return;

    if (!cartItem) {
      await mutatePostCartItem({ productId });
      await refetchCartItems();
    } else {
      await mutatePatchCartItem(
        {
          cartItemId: cartItem.id,
          quantity: cartItem.quantity + 1,
        },
        {
          onMutate: (queryClient) => {
            const prevCartItems = queryClient.getQueryData("cartItems") as GetCartItemsResponse;

            const currentCartItemIndex = prevCartItems.content.findIndex((item) => item.product.id === productId);

            const newCartContent = [...prevCartItems.content];
            newCartContent[currentCartItemIndex] = {
              ...newCartContent[currentCartItemIndex],
              quantity: cartItem.quantity + 1,
            };

            queryClient.setQueryData("cartItems", {
              ...prevCartItems,
              content: newCartContent,
            });
          },
        },
      );
    }
  };

  const decreaseCartItem = async (productId: number) => {
    const cartItem = cartItems?.content.find((item) => item.product.id === productId);

    if (!cartItem) return;

    if (cartItem.quantity === 1) {
      await mutateDeleteCartItem(
        { cartItemId: cartItem.id },
        {
          onMutate: (queryClient) => {
            const prevCartItems = queryClient.getQueryData("cartItems") as GetCartItemsResponse;

            const newCartContent = [...prevCartItems.content];

            queryClient.setQueryData("cartItems", {
              ...prevCartItems,
              content: newCartContent.filter((item) => item.product.id !== productId),
            });
          },
        },
      );
    } else {
      await mutatePatchCartItem(
        {
          cartItemId: cartItem.id,
          quantity: cartItem.quantity - 1,
        },
        {
          onMutate: (queryClient) => {
            const prevCartItems = queryClient.getQueryData("cartItems") as GetCartItemsResponse;

            const currentCartItemIndex = prevCartItems.content.findIndex((item) => item.product.id === productId);

            const newCartContent = [...prevCartItems.content];
            newCartContent[currentCartItemIndex] = {
              ...newCartContent[currentCartItemIndex],
              quantity: cartItem.quantity - 1,
            };

            queryClient.setQueryData("cartItems", {
              ...prevCartItems,
              content: newCartContent,
            });
          },
        },
      );
    }
  };

  const deleteCartItem = async (cartItemId: number) => {
    await mutateDeleteCartItem(
      { cartItemId },
      {
        onMutate: (queryClient) => {
          const prevCartItems = queryClient.getQueryData("cartItems") as GetCartItemsResponse;

          const newCartContent = [...prevCartItems.content];

          queryClient.setQueryData("cartItems", {
            ...prevCartItems,
            content: newCartContent.filter((item) => item.id !== cartItemId),
          });
        },
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
  };
}
