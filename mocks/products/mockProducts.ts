import { Product, OrderId } from '../../src/e_entities/product/index';

import mockImage from './mock_product.png';

export const mockProducts: Product[] = [
  {
    id: 1 as OrderId,
    name: '스마트폰',
    price: 999000,
    imageUrl: mockImage,
    category: '전자제품',
  },
  {
    id: 2 as OrderId,
    name: '노트북',
    price: 1500000,
    imageUrl: mockImage,
    category: '전자제품',
  },
  {
    id: 3 as OrderId,
    name: '헤드폰',
    price: 200000,
    imageUrl: mockImage,
    category: '전자제품',
  },
  {
    id: 4 as OrderId,
    name: '커피머신',
    price: 300000,
    imageUrl: mockImage,
    category: '가전제품',
  },
  {
    id: 5 as OrderId,
    name: '책상',
    price: 100000,
    imageUrl: mockImage,
    category: '가구',
  },
  {
    id: 6 as OrderId,
    name: '의자',
    price: 80000,
    imageUrl: mockImage,
    category: '가구',
  },
  {
    id: 7 as OrderId,
    name: '자전거',
    price: 250000,
    imageUrl: mockImage,
    category: '스포츠',
  },
  {
    id: 8 as OrderId,
    name: '운동화',
    price: 120000,
    imageUrl: mockImage,
    category: '의류',
  },
  {
    id: 9 as OrderId,
    name: '재킷',
    price: 150000,
    imageUrl: mockImage,
    category: '의류',
  },
  {
    id: 10 as OrderId,
    name: '책',
    price: 20000,
    imageUrl: mockImage,
    category: '도서',
  },
];
