type ShoppingItemApiState = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const getMockShoppingItemApiUrl = (state: ShoppingItemApiState, id?: number) => {
  switch (state) {
    case 'GET':
      return `${state}/api/mockData`;
    default:
      return `${state}/api/mockData/${id}`;
  }
};

type SelectItemApiState = 'GET' | 'POST' | 'PATCH';

export const getMockSelectItemApiUrl = (state: SelectItemApiState, id?: number) => {
  switch (state) {
    case 'GET':
      return `${state}/api/mockData`;
    default:
      return `${state}/api/mockData/${id}`;
  }
};
