import styled from 'styled-components';
import Button from '../../common/Button/Button';
import Flex from '../../common/Flex';

export const Root = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: sticky;
  top: 10rem;

  max-width: 35%;
  max-height: 41rem;
  border: 1px solid #dddddd;

  & > button {
    margin: 2rem 3rem 2rem 3rem;
  }

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 100%;
  }
`;

export const Title = styled.h3`
  width: 100%;

  padding: 3rem;

  font-weight: 400;
  font-size: 2.4rem;
  color: #333333;

  border-bottom: 3px solid #dddddd;
`;

export const TextWrapper = styled(Flex)`
  justify-content: space-between;

  width: 100%;

  padding: 0rem 3rem;

  &:first-of-type {
    padding: 4rem 3rem 2rem 3rem;
  }

  &:last-of-type {
    padding: 4rem 3rem;
  }
`;

export const Text = styled.span`
  font-weight: 700;
  font-size: 2rem;
  color: #333333;
`;

export const OrderButton = styled(Button)`
  max-width: calc(100% - 6rem);
`;
