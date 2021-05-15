import { COLORS } from '../../../constants';
import * as Styled from './Snackbar.styles';

export interface Props {
  message: string;
}

const Snackbar = ({ message }: Props) => {
  return <Styled.Snackbar>{message}</Styled.Snackbar>;
};

export default Snackbar;
