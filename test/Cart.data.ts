export const mockCartItems = [
  {
    id: 1,
    quantity: 2,
    isChecked: true,
    product: {
      id: 1,
      name: '상품1',
      price: 10000,
      imageUrl: '/image1.jpg',
      category: '식료품',
      quantity: 10,
    },
  },
  {
    id: 2,
    quantity: 1,
    isChecked: false,
    product: {
      id: 2,
      name: '상품2',
      price: 30000,
      imageUrl: '/image2.jpg',
      category: '식료품',
      quantity: 10,
    },
  },
];

export const cartItemsForShippingFee = {
  under100k_nonRemote: [
    {
      id: 1,
      quantity: 3,
      isChecked: true,
      product: {
        id: 1,
        name: '상품',
        price: 30000,
        quantity: 99,
        imageUrl: '',
        category: '카테고리',
      },
    },
  ],
  under100k_remote: [
    {
      id: 1,
      quantity: 3,
      isChecked: true,
      product: {
        id: 1,
        name: '상품',
        price: 30000,
        quantity: 99,
        imageUrl: '',
        category: '카테고리',
      },
    },
  ],
  over100k_nonRemote: [
    {
      id: 2,
      quantity: 2,
      isChecked: true,
      product: {
        id: 2,
        name: '고가상품',
        price: 50000,
        quantity: 99,
        imageUrl: '',
        category: '전자기기',
      },
    },
  ],
  over100k_remote: [
    {
      id: 2,
      quantity: 2,
      isChecked: true,
      product: {
        id: 2,
        name: '고가상품',
        price: 50000,
        quantity: 99,
        imageUrl: '',
        category: '전자기기',
      },
    },
  ],
};

export const cartItemsForCoupon = {
  fixedValid: [
    {
      id: 1,
      quantity: 2,
      isChecked: true,
      product: {
        id: 1,
        name: '상품1',
        price: 60000,
        imageUrl: '',
        category: '식료품',
        quantity: 10,
      },
    },
  ],
  fixedInvalid: [
    {
      id: 1,
      quantity: 1,
      isChecked: true,
      product: {
        id: 1,
        name: '상품1',
        price: 40000,
        imageUrl: '',
        category: '식료품',
        quantity: 10,
      },
    },
  ],
  bogoValid: [
    {
      id: 1,
      quantity: 2,
      isChecked: true,
      product: {
        id: 1,
        name: '상품1',
        price: 30000,
        imageUrl: '',
        category: '식료품',
        quantity: 10,
      },
    },
  ],
  bogoInvalid: [
    {
      id: 1,
      quantity: 1,
      isChecked: true,
      product: {
        id: 1,
        name: '상품1',
        price: 30000,
        imageUrl: '',
        category: '식료품',
        quantity: 10,
      },
    },
  ],
  freeShippingValid: [
    {
      id: 2,
      quantity: 2,
      isChecked: true,
      product: {
        id: 2,
        name: '상품2',
        price: 30000,
        imageUrl: '',
        category: '생활용품',
        quantity: 20,
      },
    },
  ],
  freeShippingInvalid: [
    {
      id: 3,
      quantity: 1,
      isChecked: true,
      product: {
        id: 3,
        name: '상품3',
        price: 40000,
        imageUrl: '',
        category: '문구류',
        quantity: 15,
      },
    },
  ],
};

export const cartItemsForCombination = [
  {
    id: 1,
    isChecked: true,
    quantity: 2,
    product: {
      id: 1,
      name: '상품1',
      price: 50000,
      imageUrl: '',
      category: '식료품',
      quantity: 10,
    },
  },
];

export const expensiveCartItems = [
  {
    id: 1,
    isChecked: true,
    quantity: 1,
    product: {
      id: 1,
      name: '고가상품1',
      price: 60000,
      imageUrl: '',
      category: '고가',
      quantity: 10,
    },
  },
  {
    id: 2,
    isChecked: true,
    quantity: 1,
    product: {
      id: 2,
      name: '고가상품2',
      price: 50000,
      imageUrl: '',
      category: '고가',
      quantity: 10,
    },
  },
];

export const twoQtyCartItems = [
  {
    id: 999,
    isChecked: true,
    quantity: 2,
    product: {
      id: 999,
      name: '테스트상품',
      price: 10000,
      imageUrl: '',
      category: '테스트',
      quantity: 99,
    },
  },
];
