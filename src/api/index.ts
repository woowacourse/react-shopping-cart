type ShoppingItemApiState = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export const getMockShoppingItemApiUrl = (state: ShoppingItemApiState) => {
  return '/api/mockData';
};

type SelectItemApiState = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export const getMockSelectItemApiUrl = (state: SelectItemApiState) => {
  return '/api/mockData';
};

// MOCK_DATA_URL
