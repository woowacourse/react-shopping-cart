import * as Styled from './ItemImage.styled';

export type ItemImageType = React.FC<{ url: string }>;

const ItemImage: ItemImageType = ({ url }) => {
  return <Styled.ItemImage src={url} />;
};

export default ItemImage;
