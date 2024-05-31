import styled from '@emotion/styled';

interface SmallButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  buttonText: string;
}

export default function SmallButton({ buttonText, ...props }: SmallButtonProps) {
  return <SmallButtonContainer {...props}>{buttonText}</SmallButtonContainer>;
}

const SmallButtonContainer = styled.button({
  height: '24px',
  border: '1px solid #E5E5E5',
  borderRadius: '4px',
  color: '#0A0D13',
  fontSize: '12px',
  fontWeight: '500',
  padding: '0 8px',

  '&:hover': {
    cursor: 'pointer',
  },
});
