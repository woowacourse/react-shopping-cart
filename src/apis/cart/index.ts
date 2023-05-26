import { CartProduct, CartProducts, Product } from 'types/product';
import { get, patch, post, remove } from 'apis';

const URL = '/cart-items';

type ServerCartProduct = {
  id: number;
  quantity: number;
  product: Product;
};

const isServerCartProductsType = (data: any): data is ServerCartProduct[] => {
  if (!Array.isArray(data)) return false;

  const hasCorrectKeys = data.every((value) => 'id' in value && 'quantity' in value && 'product' in value);

  return hasCorrectKeys;
};

const cartProductsParser = (data: any): CartProducts => {
  if (!isServerCartProductsType(data)) throw new Error(`서버 데이터 형식이 serverCartProducts type이 아닙니다.`);

  const parsedCartProducts = data.map(({ id, product, quantity }) => [id, { quantity, product }] as const);

  return new Map(parsedCartProducts);
};

export const getCartProducts = async (): Promise<CartProducts> => {
  const fetchedData = await get<ServerCartProduct[]>(URL);
  const cartProducts = fetchedData.data;

  return cartProductsParser(cartProducts);
};

export const addCartProducts = async (productId: Product['id']): Promise<number> => {
  const fetchedData = await post(URL, { productId });

  const location = fetchedData.headers.get('Location');
  if (!location) {
    throw new Error(`장바구니 상품 추가 요청 성공시 반환되는 location이 없습니다.`);
  }

  const cartProductId = location.replace('/cart-items/', '');

  return Number(cartProductId);
};

export const updateCartProductsQuantity = async (quantity: CartProduct['quantity'], cartProductId: number) => {
  await patch(`${URL}/${cartProductId}`, { quantity });
};

export const removeCartProduct = async (cartProductId: number) => {
  await remove(`${URL}/${cartProductId}`);
};
