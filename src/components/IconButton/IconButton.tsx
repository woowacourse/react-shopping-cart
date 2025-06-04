import { css, SerializedStyles } from '@emotion/react';
import { IconButtonLayout, IconImage } from './IconButton.style';

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  imgUrl: string;
  width?: 'sm';
  dataTestid?: string;
  customCss?: SerializedStyles;
  disabled: boolean;
}
export function IconButton({
  imgUrl,
  onClick,
  width = 'sm',
  dataTestid,
  disabled,
}: //
IconButtonProps) {
  return (
    <button
      css={[
        IconButtonLayout(width),
        disabled &&
          css`
            background: #fefefe;
            opacity: 0.2;
            cursor: auto;
          `,
      ]}
      onClick={onClick}
      data-testid={dataTestid}
      disabled={disabled}
    >
      <img src={imgUrl} css={IconImage(width)} />
    </button>
  );
}
