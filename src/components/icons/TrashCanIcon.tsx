import { IconProps } from '../../types';
import Icon from '../common/Icon';

interface Props extends IconProps {
  patternId: number;
  imageSize: { width: string; height: string };
}

const TrashCanIcon = ({ css, patternId, imageSize, ...props }: Props) => {
  return (
    <Icon
      width="24"
      height="24"
      fill="#AAA"
      path="M0 0H24V24H0V0Z"
      viewBox="0 0 24 24"
      aria-label="trash-can-icon-button"
      pathFill={`url(#pattern${patternId})`}
      css={css}
      {...props}
    >
      <defs>
        <pattern
          id={`pattern${patternId}`}
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref={`#image${patternId}`} transform="scale(0.025)" />
        </pattern>
        <image
          id={`image${patternId}`}
          width={imageSize.width}
          height={imageSize.height}
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABmUExURbu7u////729vbu7u7y8vLy8vLy8vEdwTLy8vLy8vLy8vL+/v7u7u7y8vLu7u7u7u729vbu7u7+/v7u7u7u7u7u7u7u7u7y8vL6+vru7u7y8vL29vbu7u7u7u7y8vLy8vLu7u7u7u6hNFAIAAAAhdFJOU4ABRsRoNnsAf4N6JJOSfL2+fTBxzPxXvzN4b1Z1zcCC+y6w4fIAAACdSURBVDjL7dTJDsIgFEBROvponedZ7///pKYmDS3QIBuN8W7K4iSEqWoUmIqA9bZSnapT7YKrDVb3ow33OFta8ABr3Z1aX+BsQQXWwm6wsKA4oIapAaVpDjvpdYXZa9RAAnoPSkBxRxgAXXvY39/vgc+DFPP7h78LP3HNxAfFhCVkylMGZQvT4deftjAZD7lJYrzrIvdNnRfxP/vhHjYnSVqiKRrnAAAAAElFTkSuQmCC"
        />
      </defs>
    </Icon>
  );
};

export default TrashCanIcon;
