import APIClient from '../../API';
import { CartItem } from '../../types';

export const requestOrderConfirmItems = () => APIClient.get('/orderConfirm') as Promise<CartItem[]>;
