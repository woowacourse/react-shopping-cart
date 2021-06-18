import styled from '@emotion/styled';
import { Container as Button } from '../../components/Button/Button.styles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 64rem;
`;

const ImageContainer = styled.div`
  position: relative;
  max-width: 57rem;
  height: 57rem;
  display: flex;
  margin: 0 3.5rem;

  &:after {
    content: '';
    width: 57rem;
    height: 57rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const Image = styled.img`
  margin: auto;
  width: 57rem;
  height: 57rem;
  object-fit: contain;
`;

const Name = styled.div`
  font-size: 3.2rem;
  font-weight: 700;
  letter-spacing: 0.5rem;
  margin-right: auto;
  margin: 2rem 3.5rem;
`;

const PriceContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-top: 0.4rem solid #aaaaaa;
  padding: 2rem 3.5rem 6rem;
  font-size: 2.4rem;
`;

const ShoppingCartButton = styled(Button)`
  width: 100%;
  height: 10rem;
  background-color: #73675c;
  color: #ffffff;
  font-size: 3.2rem;
  font-weight: 700;

  &:hover {
    background-color: #574e45;
  }
`;

export { Container, ImageContainer, Image, Name, PriceContainer, ShoppingCartButton };
