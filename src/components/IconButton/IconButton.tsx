import { IconButtonLayout, IconImage } from "./IconButton.style";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  imgUrl: string;
  width?: "sm";
  dataTestid?: string;
}
export function IconButton({
  imgUrl,
  onClick,
  width = "sm",
  dataTestid,
}: IconButtonProps) {
  return (
    <button
      css={IconButtonLayout(width)}
      onClick={onClick}
      data-testid={dataTestid}
    >
      <img src={imgUrl} css={IconImage(width)} />
    </button>
  );
}
