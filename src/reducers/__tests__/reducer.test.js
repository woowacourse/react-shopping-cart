import { mockCartList, mockOrderList, productList } from 'assets/mock';
import { getCartListSuccess } from 'reducers/cartList/cartList.actions';
import cartListReducer from 'reducers/cartList/cartList.reducer';
import { getOrderListSuccess } from 'reducers/orderList/orderList.actions';
import orderListReducer from 'reducers/orderList/orderList.reducer';
import { getProductSuccess } from 'reducers/product/product.actions';
import productReducer from 'reducers/product/product.reducer';
import { getProductListSuccess } from 'reducers/productList/productList.actions';
import productListReducer from 'reducers/productList/productList.reducer';

describe('action에 맞춰서 상태를 의도한대로 잘 변경하는지 확인한다', () => {
  test('1. 상품 목록 요청이 들어오면 해당 상품 목록을 정상적으로 상품 목록 상태에 추가해야 한다.', () => {
    const initialProductList = {
      data: [],
      isLoading: false,
      isError: false,
    };
    const expectedProductList = {
      data: productList,
      isLoading: false,
      isError: false,
    };

    expect(
      productListReducer(
        initialProductList,
        getProductListSuccess(productList),
      ),
    ).toEqual(expectedProductList);
  });

  test('2. 상품 요청이 들어오면 해당 상품을 정상적으로 상품  상태에 추가해야 한다.', () => {
    const mockProduct = {
      id: 1,
      name: 'MSW 캐스터네츠 커스텀캣타워H_가드형',
      imgUrl:
        'https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/1608536490_103005_1.jpg?gif=1&w=1280&h=1280&c=c',
      price: '619000',
      quantity: 10,
      cartQuantity: 1,
    };
    const initialProduct = {
      data: [],
      isLoading: false,
      isError: false,
    };
    const expectedProduct = {
      data: mockProduct,
      isLoading: false,
      isError: false,
    };

    expect(
      productReducer(initialProduct, getProductSuccess(mockProduct)),
    ).toEqual(expectedProduct);
  });

  test('3. 장바구니 목록 요청이 들어오면 해당 장바구니 목록을 정상적으로 장바구니 목록 상태에 추가해야 한다.', () => {
    const initialCartList = {
      data: [],
      isLoading: false,
      isError: false,
    };
    const expectedCartList = {
      data: mockCartList,
      isLoading: false,
      isError: false,
    };

    expect(
      cartListReducer(initialCartList, getCartListSuccess(mockCartList)),
    ).toEqual(expectedCartList);
  });

  test('4. 주문 목록 요청이 들어오면 해당 주문 목록을 정상적으로 주문 목록 상태에 추가해야 한다.', () => {
    const initialOrderList = {
      data: [],
      isLoading: false,
      isError: false,
    };
    const expectedOrderList = {
      data: mockOrderList,
      isLoading: false,
      isError: false,
    };

    expect(
      orderListReducer(initialOrderList, getOrderListSuccess(mockOrderList)),
    ).toEqual(expectedOrderList);
  });
});
