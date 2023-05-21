import styled from 'styled-components';

export const ItemWrapper = styled.div`
  width: 600px;
  margin-bottom: 60px;
  @media (min-width: 320px) and (max-width: 1100px) {
    width: 100%;
  }
`;

export const CartItemTitle = styled.p`
  padding-bottom: 24px;
  margin-bottom: 24px;
  font: ${(props) => props.theme.font.medium};
  border-bottom: 4px solid ${(props) => props.theme.color.gray};
`;

export const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Text = styled.p`
  margin: 0 12px;
  font: ${(props) => props.theme.font.small};
`;

export const SelectAllCheckBox = styled.input`
  width: 28px;
  height: 28px;
  border: 1px solid ${(props) => props.theme.color.secondary};
  border-radius: 4px;
  cursor: pointer;

  &:checked {
    background-image: url("data:image/svg+xml,%3Csvg width='23' height='17' viewBox='0 0 23 17' fill='none' xmlns='http://www.w3.org/2000/svg'%0A%3E%3Cpath d='M2 7L9.11069 14.1107L21.8318 1.38956' stroke='white' stroke-width='3' /%3E%3C/svg%3E");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: ${(props) => props.theme.color.secondary};
  }

  @media (min-width: 320px) and (max-width: 479px) {
    width: 20px;
    height: 20px;
  }
`;

export const SelectDeleteButton = styled.button`
  width: 100px;
  height: 36px;
  font: ${(props) => props.theme.font.small};
  text-align: center;
  border: 1px solid ${(props) => props.theme.color.gray};
`;

export const EmptyList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  font: ${(props) => props.theme.font.medium};
  color: ${(props) => props.theme.color.gray};
`;

export const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
`;

export const LoadingText = styled.p`
  margin-top: 20px;
  font: ${(props) => props.theme.font.small};
`;
