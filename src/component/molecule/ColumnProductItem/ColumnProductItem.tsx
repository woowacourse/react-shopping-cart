import { Link } from 'react-router-dom';
import productNotFoundImg from '../../../asset/img/empty_page.png';
import { ROUTE } from '../../../constant';
import { ProductType } from '../../../type';
import { numberWithCommas } from '../../../util';
import Button, { ButtonType } from '../../atom/Button/Button';
import ShoppingCartIcon from '../../atom/ShoppingCartIcon/ShoppingCartIcon';
import {
  Container,
  DetailContainer,
  Image,
  Name,
  Price,
  ProductDetail,
  IconContainer,
} from './ColumnProductItem.styles';

interface ColumnProductItemProps extends ProductType {
  isIconsVisible?: boolean;
  isLiked?: boolean;
  onClickShoppingCartButton: React.MouseEventHandler<HTMLButtonElement>;
  onClickLikeButton?: React.MouseEventHandler<HTMLButtonElement>;
  $buttonStyle?: ButtonType;
}

const ACTIVE = 1;
const DEACTIVE = 0.6;
const ColumnProductItem = ({
  product_id,
  image_url = productNotFoundImg,
  name,
  price,
  isIconsVisible = true,
  isLiked = false,
  onClickShoppingCartButton,
  onClickLikeButton = () => {},
  $buttonStyle = 'default',
}: ColumnProductItemProps) => (
  <Container>
    <Link to={ROUTE.GET_PRODUCT_DETAIL(product_id)}>
      <Image src={image_url} loading="lazy" />
    </Link>
    <DetailContainer>
      <ProductDetail>
        <Name>{name}</Name>
        <Price>{`${numberWithCommas(price)} 원`}</Price>
      </ProductDetail>
      {isIconsVisible && (
        <IconContainer>
          <Button
            onClick={onClickLikeButton}
            $opacity={isLiked ? ACTIVE : DEACTIVE}
            $buttonStyle={$buttonStyle}
          >
            ❤️
          </Button>
          <Button
            onClick={onClickShoppingCartButton}
            $buttonStyle={$buttonStyle}
          >
            <ShoppingCartIcon scale="0.6" color="black" />
          </Button>
        </IconContainer>
      )}
    </DetailContainer>
  </Container>
);

export default ColumnProductItem;
export type { ColumnProductItemProps };
