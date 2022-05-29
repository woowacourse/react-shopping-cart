import styled from 'styled-components';
import { ReactComponent as DeleteIcon } from 'assets/trash_can_icon.svg';

const Styled = {
  Container: styled.div`
    width: 660px;
    height: 203px;
    border-top: 2px solid ${({ theme }) => theme.colors.gray};
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray};
    display: flex;
    padding: 30px;
    justify-content: space-between;
  `,

  LeftSide: styled.div`
    display: flex;
    gap: 15px;
  `,

  RightSide: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: end;
  `,

  DeleteButton: styled(DeleteIcon)`
    cursor: pointer;
  `,

  ProductName: styled.p`
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.5px;
  `,
};

export default Styled;
