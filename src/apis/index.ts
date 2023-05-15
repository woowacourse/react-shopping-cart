import axios from 'axios';
import { PAGE_ROUTES } from '../constants/routes';

export const client = axios.create({
  baseURL: PAGE_ROUTES.BASE,
});
