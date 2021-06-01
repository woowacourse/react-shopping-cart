import styled from "styled-components";
import { COLOR } from "../../constants/style";
import { Button } from "../@shared/Button/Button.styled";

export const CartList = styled.div`
  width: 100%;
`;

export const Menu = styled.div`
  margin-bottom: 2.5rem;
  display: flex;
  justify-content: space-between;
`;

export const CheckAllLabel = styled.label`
  display: flex;
  align-items: center;
  column-gap: 0.75rem;
`;

export const RemoveChecked = styled.div`
  ${Button} {
    padding: 1rem 1.75rem;
    font-weight: bold;

    &:hover {
      border: 1px solid ${COLOR.RED.PRIMARY};
      color: ${COLOR.RED.PRIMARY};
    }
  }
`;

export const Title = styled.div`
  font-size: 1.25rem;
  padding-bottom: 1.75rem;
  border-bottom: 4px solid ${COLOR.GRAY.LIGHT_100};
`;

export const List = styled.ul``;
