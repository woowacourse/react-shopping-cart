import { css } from '@emotion/react';

interface HeaderTitleProps {
  title: string;
  description: string;
}

export default function HeaderTitleContainer({ title, description }: HeaderTitleProps) {
  return (
    <section css={headerWrapper}>
      <div css={titleWrapper}>
        <h2 css={titleText}>{title}</h2>
      </div>
      <div css={descriptionWrapper}>
        <span css={descriptionText}>
          {description.split('\n').map((text) => (
            <>
              {text}
              {<br />}
            </>
          ))}
        </span>
      </div>
    </section>
  );
}

const headerWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;

  padding: 36px 0;
`;

const titleWrapper = css`
  display: flex;
  align-items: center;

  height: 35px;
`;

const titleText = css`
  font-size: 24px;
  font-weight: 700;
`;

const descriptionWrapper = css`
  display: flex;
  align-items: center;
  width: 100%;
`;

const descriptionText = css`
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: #0a0d13;
`;
