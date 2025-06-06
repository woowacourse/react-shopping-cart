import styled from "@emotion/styled";

const DEFAULT_IMAGE_URL = "./planet-default-image.svg";

const isValidUrl = (url: string): boolean =>
  Boolean(url && (url.startsWith("http://") || url.startsWith("https://")));

export const getImageUrl = (url: string): string =>
  isValidUrl(url) ? url : DEFAULT_IMAGE_URL;

export const OrderItem = styled.div`
  width: 100%;
  padding-top: 12px;
  border-top: 1px solid #0000001a;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const OrderItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
`;

export const OrderItemImage = styled.div<{ $url: string }>`
  width: 112px;
  height: 112px;
  background: no-repeat url(${({ $url }) => getImageUrl($url)});
  background-size: cover;
  border-radius: 8px;
`;

export const OrderItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  justify-content: center;
`;

export const OrderItemName = styled.p`
  font-weight: 500;
  font-size: 16px;
`;

export const OrderItemPrice = styled.p`
  font-weight: 700;
  font-size: 26px;
`;

export const OrderItemQuantity = styled.p`
  font-weight: 500;
  font-size: 16px;
`;
