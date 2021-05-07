import React from 'react';
import Styled from './QuantityInput.styles';

type QuantityInputProps = {
  value: number;
  min: number;
  max: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ARROW_IMAGE_SRC =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAASUExURf///zMzM0RERO/v73d3d7u7u2XEkIgAAAA8SURBVAjXY2DABlgDoAwjZSjDUQQqIygIkTMSFITIOQoKikBlIHJGIIYyRAYsB5YByRlBGMoQGag+VAAAlV0GYY4qHg4AAAAASUVORK5CYII=';

const QuantityInput = (props: QuantityInputProps) => {
  const { value, min, max, onChange } = props;

  return (
    <Styled.Root>
      <Styled.Input type="number" value={value} min={min} max={max} onChange={onChange} />
      <Styled.Control>
        <Styled.ArrowWrapper>
          <Styled.ArrowUpImage src={ARROW_IMAGE_SRC} alt="arrow-up" />
        </Styled.ArrowWrapper>
        <Styled.ArrowWrapper>
          <Styled.ArrowDownImage src={ARROW_IMAGE_SRC} alt="arrow-down" />
        </Styled.ArrowWrapper>
      </Styled.Control>
    </Styled.Root>
  );
};

QuantityInput.defaultProps = {
  onChange: () => {},
};

export default QuantityInput;
