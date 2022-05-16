import styled from 'styled-components';

const ModalStyled = styled.div(
  ({ theme }) => `
  width: 300px;
  height: 178px;
  padding: 20px;
  border: none;
  box-shadow 4px 4px 30px rgba(0, 0, 0, 0.2);
  backgroundColor: '${theme.whiteColor}';
`,
);

export default ModalStyled;
