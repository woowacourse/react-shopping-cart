import { BackArrowIcon } from '../../assets';
import styled from '@emotion/styled';

const PreviousPageButton = styled.button({
  width: '32px',
  height: '32px',
  background: `url("${BackArrowIcon}") no-repeat center`,
  backgroundSize: 'auto',
  cursor: 'pointer',
});

export default PreviousPageButton;
