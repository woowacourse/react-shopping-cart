import { ComponentProps, useState } from 'react';
import { css } from '@emotion/react';

export default function Image({ src, alt, ...props }: ComponentProps<'img'>) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <div css={skeletonCss} />}
      <img
        src={imgSrc}
        alt={alt}
        css={[!isLoaded && hiddenCss]}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setImgSrc('./assets/default.png');
          setIsLoaded(true);
        }}
        {...props}
      />
    </>
  );
}

const skeletonCss = css({
  width: '100%',
  height: '100%',
  backgroundColor: '#e0e0e0',
  animation: 'pulse 1.2s infinite ease-in-out',
  '@keyframes pulse': {
    '0%': { opacity: 1 },
    '50%': { opacity: 0.4 },
    '100%': { opacity: 1 }
  }
});

const hiddenCss = css({
  display: 'none'
});
