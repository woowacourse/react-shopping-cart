/* eslint-disable @typescript-eslint/no-unused-vars */
import { styled } from 'styled-components';
import { Column, Row } from '../../../../../styles/style';
import {
  ProductItemBox,
  ProductItemImage,
  ProductName,
  ProductPrice,
} from '../../../../ProductItem/ProductItem.style';

function SkeletonProduct() {
  return (
    <Row>
      {Array.from({ length: 12 }).map((_, index) => (
        <Column>
          <ProductItemBox>
            <StyleSkeletonImg />
            <div>
              <SkeletonProductName></SkeletonProductName>
              <SkeletonProductPrice></SkeletonProductPrice>
            </div>
          </ProductItemBox>
        </Column>
      ))}
    </Row>
  );
}
const SkeletonProductName = styled(ProductName)`
  background: linear-gradient(-90deg, #aaa, #f0f0f0, #aaa, #f0f0f0);
  background-size: 400%;
  animation: skeleton-animation 5s infinite ease-out;
  border: none;

  @keyframes skeleton-animation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  width: 90%;
  height: 1rem;

  padding-left: 10%;
  padding-top: 2rem;
  border-radius: 3px;
`;

const SkeletonProductPrice = styled(ProductPrice)`
  background: linear-gradient(-90deg, #aaa, #f0f0f0, #aaa, #f0f0f0);
  background-size: 400%;
  animation: skeleton-animation 5s infinite ease-out;
  border: none;
  width: 40%;
  height: 1rem;

  @keyframes skeleton-animation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  padding-left: 10%;
  border-radius: 3px;
  padding-top: 2rem;
`;

const StyleSkeletonImg = styled(ProductItemImage)`
  background: linear-gradient(-90deg, #aaa, #f0f0f0, #aaa, #f0f0f0);
  background-size: 400%;
  animation: skeleton-animation 5s infinite ease-out;
  border: none;

  margin-bottom: 1rem;

  padding-left: 50%;
  padding-top: 50%;

  @keyframes skeleton-animation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export default SkeletonProduct;
