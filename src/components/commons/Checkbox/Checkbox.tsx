import * as Styled from './Checkbox.styles';
import { v4 as uuidv4 } from 'uuid';

export interface Props {
  labelText?: string;
  isChecked?: boolean;
  onCheck?: (isChecked: boolean) => void;
}

const Checkbox = ({ labelText, isChecked, onCheck }: Props) => {
  const uuid = uuidv4();
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    onCheck?.(isChecked);
  };

  return (
    <Styled.Checkbox>
      {labelText ? (
        <>
          <Styled.Input type="checkbox" id={uuid} checked={isChecked} onChange={onChange} />
          <Styled.Label htmlFor={uuid}>{labelText}</Styled.Label>
        </>
      ) : (
        <Styled.Input type="checkbox" checked={isChecked} onChange={onChange} />
      )}
    </Styled.Checkbox>
  );
};

export default Checkbox;
