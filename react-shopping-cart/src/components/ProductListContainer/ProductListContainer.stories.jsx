import ProductListContainer from './ProductListContainer.component';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/ProductListContainer',
  component: ProductListContainer,
};

export const FilledProductListContainer = args => <ProductListContainer {...args} />;
FilledProductListContainer.args = {
  data: [
    {
      id: 1,
      thumbnail: 'https://cdn-mart.baemin.com/sellergoods/bulk/20220502-173334/12619-main-01.jpg',
      name: '[든든] 서버산 고기',
      price: 6390,
    },
    {
      id: 2,
      thumbnail: 'https://cdn-mart.baemin.com/sellergoods/bulk/20211125-103919/12614-main-01.jpg',
      name: '[든든] 베이컨 라이트 1kg',
      price: 17210,
    },
    {
      id: 3,
      thumbnail:
        'https://cdn-mart.baemin.com/sellergoods/main/a3ce66f9-fcb1-48d4-a0e8-97ab69fc16e8.jpg',
      name: '[든든] 팜프리츠 슈스트링 7mm 2kg',
      price: 6250,
    },
    {
      id: 4,
      thumbnail: 'https://cdn-mart.baemin.com/sellergoods/bulk/20220502-173334/12620-main-01.jpg',
      name: '[든든] 전지베이컨 20mm 탑핑 1kg',
      price: 12910,
    },
    {
      id: 5,
      thumbnail:
        'https://cdn-mart.baemin.com/sellergoods/main/c7e706b8-b23a-4f87-9c1b-b4f27967ece4.jpg',
      name: '[든든] 카벤디쉬 케이준스타일 양념감자 2kg',
      price: 10490,
    },
    {
      id: 6,
      thumbnail: 'https://cdn-mart.baemin.com/sellergoods/bulk/20211228-161230/22700-main-01.jpg',
      name: '[든든] 코코스 통살가라아게 1kg',
      price: 6780,
    },
    {
      id: 7,
      thumbnail: 'https://cdn-mart.baemin.com/sellergoods/bulk/20211125-103919/12608-main-01.jpg',
      name: '[든든] 베이컨블록 500g',
      price: 10340,
    },
    {
      id: 8,
      thumbnail:
        'https://cdn-mart.baemin.com/sellergoods/main/9430fd5c-3e50-4569-beb1-e4aa58efbd6e.png',
      name: '[든든] 쉐프솔루션 그릴후랑크(냉장) 660g',
      price: 6290,
    },
    {
      id: 9,
      thumbnail:
        'https://cdn-mart.baemin.com/sellergoods/main/6bdcd431-7c45-43ab-a2eb-40bce5088656.png',
      name: '[든든] 쉐프솔루션 칼집숑숑비엔나(냉장) 1Kg',
      price: 7680,
    },
  ],
  handleToggleShoppingCart: action('clicked'),
  checkContainedProduct: () => false,
};

export const EmptyProductListContainer = args => <ProductListContainer {...args} />;
EmptyProductListContainer.args = {
  data: [],
  handleToggleShoppingCart: action('clicked'),
  checkContainedProduct: () => false,
};
