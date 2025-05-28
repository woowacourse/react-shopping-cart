interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
}

const Checkbox = ({ checked, ...props }: CheckboxProps) => {
  return <input type="checkbox" checked={checked} {...props} />;
};

export default Checkbox;
