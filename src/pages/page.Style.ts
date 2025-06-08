import styled from '@emotion/styled';

const S = {
  title: styled.p`
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 12px;
  `,

  content: styled.div`
    padding: 24px;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 64px - 64px);
  `,

  itemCardList: styled.ul`
    overflow-y: auto;
  `,

  infoContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    padding-bottom: 12px;
    border-bottom: 2px solid #e6e6e6;
  `,
};

export default S;
