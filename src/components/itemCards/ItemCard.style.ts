import styled from '@emotion/styled';

const S = {
  Container: styled.div`
    border-top: 1px solid #e0e0e0;
    height: 160px;
    margin-bottom: 20px;
  `,

  ButtonBox: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
  `,

  ItemBox: styled.div`
    margin-top: 12px;
    height: 112px;
    display: flex;
    align-items: center;
    gap: 24px;
  `,

  ItemImage: styled.img`
    width: 112px;
    height: 112px;
    object-fit: cover;
  `,

  ItemInfoBox: styled.div`
    height: 100%;
    padding: 10px 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,

  ItemName: styled.p`
    font-size: 12px;
    font-weight: 500;
    margin-bottom: 4px;
  `,

  ItemPrice: styled.p`
    font-size: 24px;
    font-weight: 700;
  `,

  Stepper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
    width: 80px;
  `,

  deleteButton: styled.button`
    background-color: white;
    border: 2px solid #e6e6e6;
    border-radius: 8px;
    padding: 4px 8px;
  `,
};

export default S;
