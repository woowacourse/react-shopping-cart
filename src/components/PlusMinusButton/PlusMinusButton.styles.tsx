import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { theme } from "@/styles";

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const controlButton = css`
  padding: 0;
  border-radius: 8px;
  border: 1.5px solid ${theme.colors.gray};
  width: 20px;
  height: 20px;
  background: ${theme.colors.white};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const controlButtonText = css`
  width: 100%;
  font-size: 24px;
  color: ${theme.colors.black};
  text-align: center;
`;

export const quantityText = css`
  width: 24px;
  text-align: center;
`;
