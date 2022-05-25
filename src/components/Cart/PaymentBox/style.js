import styled from 'styled-components';

export const Wrapper = styled.section`
  width: 338px;
  height: 218px;
  border: 1px solid ${({ theme }) => theme.COLOR.GREY_200};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const TopBox = styled.div`
  width: 100%;
  padding: 15px 0;

  border-bottom: 2px solid ${({ theme }) => theme.COLOR.GREY_300};
`;

export const TitleText = styled.span`
  margin-left: 20px;
`;

export const BottomBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
`;

export const Text = styled.p`
  line-height: 1.5px;
  border-bottom: 5px solid ${({ theme }) => theme.COLOR.RED_300};
`;
