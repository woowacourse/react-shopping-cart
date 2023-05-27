import { Product } from '../types';
import { CartItem } from '../types';
import { getLocalStorage } from '../utils/localStorage';

export const cartItems: CartItem[] = getLocalStorage<CartItem[]>('cart', []);

export const products: Product[] = [
  {
    id: 1,
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/2ddb9f04-c15d-4647-b6e7-30afb9e8d072.jpg?h=300&w=300',
  },
  {
    id: 2,
    name: 'PET보틀-밀크티(370ml)',
    price: 73400,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/ac90cb6d-70ad-4271-a25e-03e4db9a9960.jpg?h=300&w=300',
  },
  {
    id: 3,
    name: 'PET보틀-정사각(370ml)',
    price: 41000,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/fbe1660a-20f4-4077-8ce7-d8926c7b4e6d.jpg?h=300&w=300',
  },
  {
    id: 4,
    name: 'PET보틀-납작(450ml)',
    price: 39900,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/6adcd3f3-25a3-4038-82a4-322eb72ec281.jpg?h=300&w=300',
  },
  {
    id: 5,
    name: 'PET보틀-단지(480ml)',
    price: 41000,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/61d13e8f-63fe-4a19-baee-e84a2ae2b922.jpg?h=300&w=300',
  },
  {
    id: 6,
    name: 'PET보틀-납작(260ml)',
    price: 61800,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/d07bec18-ce84-41c2-8903-61cbd10712b6.jpg?h=300&w=300',
  },
  {
    id: 7,
    name: 'PET보틀-원형(500ml)',
    price: 70000,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/2ddb9f04-c15d-4647-b6e7-30afb9e8d072.jpg?h=300&w=300',
  },
  {
    id: 8,
    name: 'PET보틀-원형(300ml)',
    price: 40400,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/09601088-36bc-484f-ba30-b6cb04eee0b8.jpg?h=300&w=300',
  },
  {
    id: 9,
    name: 'PET보틀-삼각(330ml)',
    price: 65300,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/b51caccc-cd64-479a-a600-a7ce0507085f.jpg?h=300&w=300',
  },
  {
    id: 10,
    name: 'PET보틀-삼각(530ml)',
    price: 10000,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/6e1e0dc3-4a10-4729-910a-ff3c837836fe.jpg?h=300&w=300',
  },
  {
    id: 11,
    name: 'PET보틀-원형(600ml)',
    price: 47500,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/03e63566-5d56-4dc0-9357-2caaeaeebf7e.jpg?h=300&w=300',
  },
  {
    id: 12,
    name: 'PET보틀-납작(260ml)',
    price: 64200,
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/d07bec18-ce84-41c2-8903-61cbd10712b6.jpg?h=300&w=300',
  },
];
