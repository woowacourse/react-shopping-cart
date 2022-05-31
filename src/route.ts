export const ROUTE: {
  Home: string;
  ShoppingCart: string;
  OrderList: string;
  ProductDetail: string;
  NotFound: string;
  SignUp: string;
  Login: string;
  Edit: string;
  Leave: string;
} = {
  Home: '/',
  ShoppingCart: '/shopping-cart',
  OrderList: '/order-list',
  ProductDetail: '/products/:productId',
  SignUp: '/customers/sign-up',
  Login: '/customers/login',
  Edit: '/customers/edit',
  Leave: '/customers/leave',
  NotFound: '/*',
};
