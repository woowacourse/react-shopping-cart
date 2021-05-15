import * as Styled from './ItemGroup.styles';

export interface Props {
  children: React.ReactNode;
  headerText: string;
  headerLinkButtonText?: string;
  onHeaderLinkClick?: () => void;
}

const ItemGroup = ({ children, headerText, onHeaderLinkClick, headerLinkButtonText }: Props) => {
  return (
    <Styled.ItemGroup>
      <Styled.Header>
        <Styled.HeaderText>주문번호 : {headerText}</Styled.HeaderText>
        {headerLinkButtonText && (
          <Styled.HeaderLink onClick={onHeaderLinkClick}>{headerLinkButtonText}</Styled.HeaderLink>
        )}
      </Styled.Header>
      <Styled.ItemContainer>{children}</Styled.ItemContainer>
    </Styled.ItemGroup>
  );
};

export default ItemGroup;
