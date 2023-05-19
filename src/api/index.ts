type ShoppingItemApiState = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const getMockShoppingItemApiUrl = (state: ShoppingItemApiState, id?: number) => {
  switch (state) {
    case 'GET':
      return `${state}/products`;
    default:
      return `${state}/products/${id}`;
  }
};

type SelectItemApiState = 'GET' | 'POST' | 'DELETE';

export const getMockSelectItemApiUrl = (state: SelectItemApiState, id?: number) => {
  switch (state) {
    case 'GET':
      return `${state}/cart-items`;
    default:
      return `${state}/cart-items/${id}`;
  }
};
