import { Fragment } from 'react';

import {
  descriptionText,
  descriptionWrapper,
  headerWrapper,
  titleText,
  titleWrapper,
} from './HeaderTitleContainer.styled';

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
          {description.split('\n').map((text, idx) => (
            <Fragment key={idx}>
              {text}
              {<br />}
            </Fragment>
          ))}
        </span>
      </div>
    </section>
  );
}
