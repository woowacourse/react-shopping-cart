interface PostCartItemRequestBody {
  productId: number;
  quantity: number;
}

interface PatchCartItemRequestBody {
  productId: number;
  quantity: number;
}

export type { PostCartItemRequestBody, PatchCartItemRequestBody };
