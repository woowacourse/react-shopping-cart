import styled from '@emotion/styled';

export type SizeType = 'small' | 'large' | 'full';

interface BorderButtonProps {
  size?: SizeType;
}

export const BorderButton = styled.button<BorderButtonProps>(
  ({ theme, size = 'large' }) => ({
    background: 'none',
    border: `1px solid ${theme.colors.border}`,
    borderRadius: `${theme.borderRadius.medium}`,

    width: size === 'small' ? '24px' : size === 'large' ? '40px' : '100%',
    height: size === 'small' ? '24px' : 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '12px',
    padding: size === 'full' ? '12px' : 0,

    img: {
      width: size === 'small' ? '12px' : size === 'large' ? '16px' : 'auto',
    },
  })
);
