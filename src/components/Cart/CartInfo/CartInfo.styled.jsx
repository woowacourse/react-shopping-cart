import styled from "styled-components";
import { COLOR } from "../../../constants/style";
import * as S from "../../@shared/CheckBox/CheckBox.styled";

export const CartInfo = styled.div`
  width: 100%;
  margin-right: 5rem;
`;

export const Menu = styled.div`
  margin-bottom: 2.5rem;
  display: flex;
  justify-content: space-between;
`;

export const CheckAllLabel = styled.label`
  ${S.CheckBox} {
    margin-right: 0.75rem;
  }
`;

export const RemoveChecked = styled.div`
  button {
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
