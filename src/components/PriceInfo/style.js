import styled from 'styled-components';

const TitleStyled = styled.div`
  width: 100%;
  border-bottom: 3px solid #ddd;
  font-size: 24px;
  padding-bottom: 20px;
  margin-bottom: 34px;
`;

const SubTitleStyled = styled.div(
  ({ theme }) => `
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 700;
  mark {
    background: ${theme.mainColor};
    display: inline-block;
    line-height: 0em;
    padding-bottom: 0.5em;
  }
`,
);

export { TitleStyled, SubTitleStyled };
