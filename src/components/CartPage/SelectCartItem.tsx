import styled from 'styled-components';
import CheckIconImage from '../../asset/check_icon.svg';

export default function SelectCartItem() {
  return (
    <SelectCartItemContainer>
      <SelectBox type='checkbox' />
      <Text>전체선택(?/??)</Text>
      <SelectDeleteButton>선택 삭제</SelectDeleteButton>
    </SelectCartItemContainer>
  );
}

const SelectCartItemContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SelectBox = styled.input`
  appearance: none;
  width: 2.8rem;
  height: 2.8rem;
  border: 1px solid ${({ theme }) => theme.colors.blue_green};
  border-radius: 2px;
  cursor: pointer;

  &:checked {
    border: 1px solid ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primary};
    background-image: url(${CheckIconImage});
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const Text = styled.span`
  ${({ theme }) => theme.fonts.name}
  margin: 0 1rem;
`;

const SelectDeleteButton = styled.button`
  background-color: transparent;
  ${({ theme }) => theme.fonts.name}
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: 0.5rem 1rem;
  cursor: pointer;
`;
