interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export default function Button({ title, ...rest }: ButtonProps) {
  return <button {...rest}>{title}</button>;
}
