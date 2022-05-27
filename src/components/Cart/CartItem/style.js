import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 500px;
  height: 200px;

  border-top: 1px solid ${({ theme }) => theme.COLOR.GREY_200};
`;

export const LeftBox = styled.div`
  width: 70%;
  display: flex;
`;

export const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const Image = styled.img`
  width: 120px;
  height: 120px;
  margin: 0 15px;
`;

export const Name = styled.span`
  font-size: 15px;
`;

export const QuantityControlBox = styled.div`
  width: 60px;
  height: 25px;
  padding: 15px 5px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 1px solid ${({ theme }) => theme.COLOR.GREY_200};
  margin: 10px 0;
`;

export const QuantityButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.COLOR.RED_300};
  cursor: pointer;
  font-size: 20px;
`;

export const Price = styled.span`
  font-size: 13px;
`;

export const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const TrashBinSvg = styled.img`
  width: 18px;
  height: 18px;
`;
