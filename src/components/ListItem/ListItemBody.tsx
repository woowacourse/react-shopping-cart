import { Default } from '../../assets';
import { ListItemBodyStyle, ItemImageStyle } from './ListItem.styles';

function ListItemBody({
  children,
  imageUrl,
  name,
}: {
  children: React.ReactNode;
  imageUrl: string | null;
  name: string;
}) {
  return (
    <div css={ListItemBodyStyle}>
      <img css={ItemImageStyle} src={imageUrl ?? Default} alt={name} />
      {children}
    </div>
  );
}

export default ListItemBody;
