import { Link } from 'react-router-dom';
import { ROUTE } from '../../../constant';
import { ItemType } from '../../../type';
import { numberWithCommas } from '../../../util';
import {
  Container,
  Image,
  ProductContainer,
  ProductDetail,
  Name,
} from './RowProductItem.styles';

interface RowProductItemProps extends Partial<ItemType> {
  product_id: string;
  quantity?: number;
}
const RowProductItem = ({
  product_id,
  image_url = 'https://lh3.googleusercontent.com/proxy/1c4QW5NSZSE7GWkRDMJC-0fBKuXA0rOGWy3b7orSCWSui-lGrgG7yx03uivU67j0Rm2bWAdF46VvqAnW2mFJ3n-EQDu1fr7XzQey',
  name = '',
  price,
  quantity,
}: RowProductItemProps) => (
  <Container>
    <Link to={ROUTE.GET_PRODUCT_DETAIL(product_id)}>
      <Image src={image_url} />
    </Link>
    <ProductContainer>
      <Name>{name}</Name>
      <ProductDetail>
        {price && <span>{`${numberWithCommas(price)} 원 / `}</span>}
        {quantity && <span>{`수량: ${quantity} 개`}</span>}
      </ProductDetail>
    </ProductContainer>
  </Container>
);

export default RowProductItem;
export type { RowProductItemProps };
