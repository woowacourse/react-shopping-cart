import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 200px;
  cursor: pointer;
`;

export const Overlay = styled.div`
  opacity: 0;
  width: 100%;
  height: 200px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.5);
  color: #fff;
  z-index: 2000;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 1;
  }
`;

export const ThumbnailText = styled.span`
  font-size: 18px;
  font-weight: bold;
  font-family: ${({ theme }) => theme.FONT.PRIMARY};
  color: ${({ theme }) => theme.COLOR.GREY_500};
  text-align: center;
`;

export const Image = styled.img`
  max-width: 100%;
`;

export const Detail = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  width: 100%;
`;

export const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.FONT.SECONDARY};
`;

export const Name = styled.span`
  font-size: 14px;
  width: 147px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Price = styled.span`
  font-size: 18px;
`;

export const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const CartSvg = styled.img`
  max-width: 100%;
`;
