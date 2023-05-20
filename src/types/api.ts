import { HTTP_ERROR_MESSAGE } from '../constants/api';

type HTTPErrorMessageCode = keyof typeof HTTP_ERROR_MESSAGE;

interface PostCartItemRequestBody {
  productId: number;
  quantity: number;
}

interface PatchCartItemRequestBody {
  productId: number;
  quantity: number;
}

export type { HTTPErrorMessageCode, PostCartItemRequestBody, PatchCartItemRequestBody };
