import TextBox from '../TextBox/TextBox.component';
import styled from 'styled-components';

const TitleBox = styled(TextBox).attrs({
  fontSize: 'extraLarge',
  bold: true,
})`
  width: 1320px;
  border-bottom: 4px solid ${({ theme }) => theme.colors['BLACK_001']};
  padding: 30px;
  text-align: center;
  margin-bottom: 40px;
`;

export default TitleBox;
