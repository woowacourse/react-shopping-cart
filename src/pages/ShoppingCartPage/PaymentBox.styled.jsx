import styled from "styled-components";

const StyledPaymentBoxContainer = styled.div`
  position: sticky;
  top: 300px;

  width: 448px;
  padding: 30px;

  border: 1px solid ${({ theme }) => theme.color.grey_100};
`;

const StyledTitle = styled.h3`
  height: 40px;
  margin-bottom: 20px;

  font-size: 24px;
  line-height: 33px;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.color.grey_700};
`;

const StyledLine = styled.hr`
  position: relative;
  left: -30px;

  width: 446px;
  height: 3px;

  background-color: ${({ theme }) => theme.color.grey_100};
  border: none;
`;

const StyledHighlightedTextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 68px;
  padding-top: 34px;
`;

export {
  StyledPaymentBoxContainer,
  StyledTitle,
  StyledLine,
  StyledHighlightedTextContainer,
};
