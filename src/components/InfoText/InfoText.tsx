import { infoImg, infoLayout, intoText } from "./InfoText.style";

export function InfoText({
  children,
  showImg = false,
}: {
  children: React.ReactNode;
  showImg?: boolean;
}) {
  return (
    <div css={infoLayout}>
      {showImg && <img src="./info.png" css={infoImg} />}
      <p css={intoText}>{children}</p>
    </div>
  );
}
