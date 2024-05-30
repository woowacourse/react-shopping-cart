import { Button, Text } from '@/f_shared';

import css from './FooterButton.module.css';

interface FooterButtonProps {
  children: string;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const FooterButton = ({ children, disabled = false, onClick }: FooterButtonProps) => {
  return (
    <Button disabled={disabled} className={css.root} theme={'primary'} onClick={onClick}>
      <Text tag={'span'} type={'c1'}>
        {children}
      </Text>
    </Button>
  );
};
