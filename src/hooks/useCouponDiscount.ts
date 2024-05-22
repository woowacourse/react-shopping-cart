import { CartItemType } from '@/types/cart.type';
import { Coupon } from '@/types/coupon.type';
import { orderItemState } from '@/store/selectors/orderItemSelector';
import { shippingFeeState } from '../store/selectors/shippingFeeSelector';
import useCouponAvailable from './useCouponAvailable';
import useCouponValidator from './useCouponValidator';
import { useRecoilValue } from 'recoil';

interface Props {
  coupon: Coupon;
  date: Date;
  orderPrice?: number;
}

const useCouponDiscount = ({ coupon, date, orderPrice }: Props) => {
  const fixedCoupon = () => {
    return coupon.discount;
  };

  const bogoCoupon = (orderedList: CartItemType[]) => {
    const { buyQuantity, getQuantity } = coupon;

    if (!buyQuantity || !getQuantity) return true;

    return orderedList.reduce((acc, cur) => {
      if (
        cur.quantity >= buyQuantity + getQuantity &&
        cur.product.price > acc
      ) {
        return cur.product.price;
      }
      return acc;
    }, 0);
  };

  const percentCoupon = (orderPrice: number) => {
    console.log(orderPrice, coupon.discount);
    return coupon.discount && orderPrice * coupon.discount * 0.01;
  };

  {
    const isValid = useCouponValidator({ coupon, date });
    const isAvailable = useCouponAvailable({ coupon, date });

    const shippingFee = useRecoilValue(shippingFeeState);

    const orderedList = useRecoilValue(orderItemState);

    if (!isValid || !isAvailable) return 0;

    if (coupon.discountType === 'fixed') return fixedCoupon();
    if (coupon.discountType === 'buyXgetY') return bogoCoupon(orderedList);
    if (coupon.discountType === 'freeShipping') return shippingFee;
    if (coupon.discountType === 'percentage' && orderPrice)
      return percentCoupon(orderPrice);
    return 0;
  }
};

export default useCouponDiscount;
