import * as Styled from './ListItem.styles';
import noImagePNG from '../../../assets/images/no-image.png';

export interface Props {
  size: 'SM' | 'MD';
  thumbnail?: string;
  name: string;
  price: string;
  quantity: string;
}

const ListItem = ({ size = 'SM', thumbnail = noImagePNG, name, price, quantity }: Props) => {
  return (
    <Styled.ListItem>
      <Styled.Thumbnail size={size} src={thumbnail} />
      <Styled.InfoWrapper>
        <Styled.Name size={size}>{name}</Styled.Name>
        <Styled.Price size={size}>
          {price}원 / 수량 : {quantity}개
        </Styled.Price>
      </Styled.InfoWrapper>
    </Styled.ListItem>
  );
};

export default ListItem;
