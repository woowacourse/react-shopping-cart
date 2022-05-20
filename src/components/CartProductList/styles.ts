import styled from "styled-components";
import { alignCenter, spaceBetween } from "../../styles/mixin";

const SelectAllContainer = styled.div`
  ${spaceBetween};
  margin: 30px 0;

  div {
    ${alignCenter};
  }

  span {
    margin-left: 10px;
  }

  button {
    color: ${({ theme }) => theme.colors.GRAY_800};
    background-color: ${({ theme }) => theme.colors.WHITE};
    border: 1px solid ${({ theme }) => theme.colors.GRAY_400};

    &:hover {
      background-color: ${({ theme }) => theme.colors.GRAY_800};
      color: ${({ theme }) => theme.colors.WHITE};
    }
  }
`;

const CartListTitle = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.colors.GRAY_400};
  padding-bottom: 10px;
`;

export { SelectAllContainer, CartListTitle };
