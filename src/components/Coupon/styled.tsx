import styled from 'styled-components';

export const ApplyCouponButton = styled.button`
  width: 100%;
  height: 4.8rem;

  border: 0.1rem solid ${props => props.theme.color.lightGray2};
  border-radius: 0.5rem;
  background-color: ${props => props.theme.color.white};
  ${props => props.theme.typography.boldLabel};
  color: ${props => props.theme.color.lightGray3};

  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.color.black10};
  }
`;

export const ConfirmButton = styled.button`
  width: 100%;
  height: 4.4rem;

  border: none;
  border-radius: 0.5rem;
  background-color: ${props => props.theme.color.lightGray4};
  ${props => props.theme.typography.boldLabel};
  color: ${props => props.theme.color.white};

  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.color.black};
  }
`;
