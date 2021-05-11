import * as Styled from './Checkbox.styles';

export interface Props {
  labelText?: string;
  isChecked?: boolean;
  onCheck?: (isChecked: boolean) => void;
}

const Checkbox = ({ labelText, isChecked, onCheck }: Props) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    onCheck && onCheck(isChecked);
  };
  return (
    <Styled.Checkbox>
      {labelText ? (
        <>
          <Styled.Input type="checkbox" id={labelText} checked={isChecked} onChange={onChange} />
          <Styled.Label htmlFor={labelText}>{labelText}</Styled.Label>
        </>
      ) : (
        <Styled.Input type="checkbox" checked={isChecked} onChange={onChange} />
      )}
    </Styled.Checkbox>
  );
};

export default Checkbox;
