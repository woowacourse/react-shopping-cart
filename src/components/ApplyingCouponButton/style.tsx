import styled from 'styled-components';

export const ApplyingCouponButton = styled.button`
  width: 100%;
  height: 3rem;
  border: 1px solid ${(props) => props.theme.color.borderGray};
  border-radius: 5px;

  background-color: ${(props) => props.theme.color.white};

  ${(props) => props.theme.typography.label}
  color: ${(props) => props.theme.color.darkGray};

  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.color.borderGray};
  }
`;
