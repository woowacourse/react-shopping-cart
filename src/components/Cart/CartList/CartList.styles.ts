import { styled } from 'styled-components';

export const CartListWrapper = styled.div`
  width: 736px;
  margin: 36px auto;
`;

export const CartListHeader = styled.div`
  display: flex;
  font: ${(props) => props.theme.font.price};
  gap: 8px;

  border-bottom: 3px solid ${(props) => props.theme.color.primary};
  padding-bottom: 16px;
  span {
    opacity: 0.6;
    font-weight: 300;
  }
`;

export const SelectInput = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1.5px solid gainsboro;
  border-radius: 5px;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: ${(props) => props.theme.color.secondary};
  }
`;
export const SelectLabel = styled.label`
  display: flex;
  align-items: center;
  user-select: none;

  &:hover {
    cursor: pointer;
  }
`;
export const SelectText = styled.p`
  margin-left: 0.25rem;
`;
