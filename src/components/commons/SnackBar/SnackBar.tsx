import ReactDOM from 'react-dom';

import * as Styled from './SnackBar.styles';

const $snackBar = document.querySelector('#snack-bar');

export interface Props {
  message: string;
}

const SnackBar = ({ message }: Props) => {
  if (!$snackBar) return null;
  return ReactDOM.createPortal(<Styled.SnackBar>{message}</Styled.SnackBar>, $snackBar);
};

export default SnackBar;
