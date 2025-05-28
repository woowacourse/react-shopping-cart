import styled from "@emotion/styled";

const DEFAULT_IMAGE_URL = "./planet-default-image.svg";

const isValidUrl = (url: string): boolean =>
  Boolean(url && (url.startsWith("http://") || url.startsWith("https://")));

export const getImageUrl = (url: string): string =>
  isValidUrl(url) ? url : DEFAULT_IMAGE_URL;

export const CartItem = styled.div`
  width: 100%;
  padding-top: 12px;
  border-top: 1px solid #0000001a;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CartItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CartItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
`;

export const CartItemImage = styled.div<{ $url: string }>`
  width: 112px;
  height: 112px;
  background: no-repeat url(${({ $url }) => getImageUrl($url)});
  background-size: cover;
  border-radius: 8px;
`;

export const CartItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  justify-content: center;
`;

export const CartItemName = styled.p`
  font-weight: 500;
  font-size: 16px;
`;

export const CartItemPrice = styled.p`
  font-weight: 700;
  font-size: 26px;
`;

export const DeleteButton = styled.button`
  cursor: pointer;
  background: none;
  margin: 0;
  padding: 0;
  border: 1px solid #0000001a;
  border-radius: 4px;
  width: 44px;
  height: 28px;
  font-weight: 500;
  font-size: 14px;
  line-height: 15px;

  &:active {
    border-color: rgb(230, 230, 230);
    background-color: #f0f0f0;
    transform: scale(0.95);
  }
`;
