import { CartItemType } from '@/types/cart.type';
import { Coupon } from '@/types/coupon.type';
import { orderItemState } from '@/store/selectors/orderItemSelector';
import { orderRecipeState } from '@/store/selectors/orderRecipeSelector';
import { useRecoilValue } from 'recoil';

interface Props {
  coupon: Coupon;
  orderPrice?: number;
}

const useCouponDiscount = ({ coupon, orderPrice }: Props) => {
  const fixedCoupon = () => {
    return coupon.discount || 0;
  };

  const bogoCoupon = (orderedList: CartItemType[]) => {
    const { buyQuantity, getQuantity } = coupon;
    if (!buyQuantity || !getQuantity) return 0;

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
    return (coupon.discount && orderPrice * coupon.discount * 0.01) || 0;
  };

  const { shippingFee } = useRecoilValue(orderRecipeState);
  const orderedList = useRecoilValue(orderItemState);

  if (!coupon) return 0;

  if (coupon.discountType === 'fixed') return fixedCoupon();
  if (coupon.discountType === 'buyXgetY') return bogoCoupon(orderedList);
  if (coupon.discountType === 'freeShipping') return shippingFee;
  if (coupon.discountType === 'percentage' && orderPrice)
    return percentCoupon(orderPrice);

  return 0;
};

export default useCouponDiscount;
