import * as Styled from './ItemSelection.styled';

const ItemSelection: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <Styled.ItemSelectionWrapper>{children}</Styled.ItemSelectionWrapper>;
};

export default ItemSelection;
