import { COLORS } from '../../../constants';
import * as Styled from './Checkbox.styles';

export interface Props {
  labelText?: string;
}

const Checkbox = ({ labelText }: Props) => {
  return (
    <Styled.Checkbox>
      {labelText ? (
        <>
          <Styled.Input type="checkbox" id={labelText} />
          <Styled.Label htmlFor={labelText}>{labelText}</Styled.Label>
        </>
      ) : (
        <Styled.Input type="checkbox" />
      )}
    </Styled.Checkbox>
  );
};

export default Checkbox;
