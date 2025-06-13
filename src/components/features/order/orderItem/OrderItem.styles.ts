import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 24px;
  background-color: white;
`;

export const PreviewBox = styled.div`
  width: 112px;
  height: 112px;
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 8px;
  object-fit: cover;
`;

export const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 24px;
`;

export const CartProductInfo = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
`;

export const CartProductTitle = styled.p`
  font-size: 12px;
  font-weight: 500;
`;

export const CartProductPrice = styled.p`
  font-size: 24px;
  font-weight: 700;
`;

export const DeleteButton = styled.button`
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #0000001a;
`;

export const DeleteButtonText = styled.p`
  width: 100%;

  font-size: 12px;
  font-weight: 500;
`;

export const Text = styled.p`
  width: 24px;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  vertical-align: middle;
`;
