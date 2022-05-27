import productReducer, {
  GET_PRODUCT_SUCCESS,
} from 'reducers/product/product.reducer';

describe('action에 맞춰서 상태를 의도한대로 잘 변경하는지 확인한다', () => {
  test('상품 요청이 들어오면 해당 상품을 정상적으로 상품  상태에 추가해야 한다.', () => {
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
      productReducer(initialProduct, {
        type: GET_PRODUCT_SUCCESS,
        data: mockProduct,
      }),
    ).toEqual(expectedProduct);
  });
});
