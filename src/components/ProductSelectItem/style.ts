import { ImageSkeletonStyle } from '@Styles/common/skeletonProductItem';
import styled from 'styled-components';

export const Container = styled.li`
  display: grid;
  grid-template-columns: 30px 144px auto 80px;
  gap: 3%;

  padding: 3%;

  border-top: 1.5px solid #cccccc;

  @media (max-width: 575px) {
    grid-template-columns: 40px auto 80px;
  }
`;

export const ProductItemImageFrame = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;

  @media (max-width: 575px) {
    display: none;
  }
`;

export const ProductItemImage = styled.img`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;

  border-radius: 3px;

  ${ImageSkeletonStyle};

  @media (max-width: 575px) {
    display: none;
  }
`;

export const ProductItemLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 15px;
`;

export const ProductItemName = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  letter-spacing: 0.5px;

  @media (max-width: 767px) {
    font-size: 15px;
  }
`;

export const ProductItemPrice = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  letter-spacing: 0.5px;
`;

export const DeleteItemIcon = styled.img`
  width: 24px;
  height: 24px;

  cursor: pointer;
`;
