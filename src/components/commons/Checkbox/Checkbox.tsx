import * as Styled from './Checkbox.styles';

export interface Props extends Pick<React.InputHTMLAttributes<HTMLInputElement>, 'checked'> {
  labelText?: string;
  onCheck?: (isChecked: boolean) => void;
}

const Checkbox = ({ labelText, checked, onCheck }: Props) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    onCheck?.(isChecked);
  };
  return (
    <Styled.Checkbox>
      {labelText ? (
        <>
          <Styled.Input type="checkbox" id={labelText} checked={checked} onChange={onChange} />
          <Styled.Label htmlFor={labelText}>{labelText}</Styled.Label>
        </>
      ) : (
        <Styled.Input type="checkbox" checked={checked} onChange={onChange} />
      )}
    </Styled.Checkbox>
  );
};

export default Checkbox;
