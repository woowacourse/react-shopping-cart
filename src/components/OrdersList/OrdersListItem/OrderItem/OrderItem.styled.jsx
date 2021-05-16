import styled from "styled-components";
import { MEDIA_QUERY, COLOR } from "../../../../constants/style";

export const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.75rem 1.5rem;
  border: 1px solid ${COLOR.GRAY_400};
  border-top: 0;

  @media (max-width: ${MEDIA_QUERY.MOBILE}) {
    flex-direction: column;
  }
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: ${MEDIA_QUERY.MOBILE}) {
    margin-bottom: 1rem;
    width: 100%;
  }
`;

export const Img = styled.img`
  width: 8.75rem;
  height: 8.75rem;
`;

export const Detail = styled.div`
  height: 8.75rem;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  letter-spacing: 0.5px;

  @media (max-width: ${MEDIA_QUERY.MOBILE}) {
    width: 100%;
  }
`;

export const Name = styled.span`
  font-size: 1.25rem;
  margin-bottom: 1.75rem;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

export const PriceAmount = styled.span`
  color: ${COLOR.GRAY_700};
`;

export const Button = styled.div`
  width: 8.5rem;
  height: 3rem;
  align-self: flex-start;

  button {
    border-radius: 2px;
  }

  @media (max-width: ${MEDIA_QUERY.MOBILE}) {
    width: 100%;
  }
`;
