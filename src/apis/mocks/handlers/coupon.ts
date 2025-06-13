import { http, HttpResponse } from 'msw';
import MOCKING_COUPONS_DATA from '../data/coupons.json';
import { CouponType } from '../../../types/cart';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const coupons = MOCKING_COUPONS_DATA as CouponType[];

const getCoupons = http.get(`${BASE_URL}/coupons`, () => {
  return HttpResponse.json(coupons);
});

export default [getCoupons];
