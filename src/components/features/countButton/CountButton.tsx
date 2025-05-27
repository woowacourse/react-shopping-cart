import * as S from './CountButton.styles';

const CountButton = () => {
  return (
    <div css={S.countButtonContainer}>
      <button css={S.countButtonButtonStyle} onClick={() => {}}>
        -
      </button>
      <span>1</span>
      <button css={S.countButtonButtonStyle} onClick={() => {}}>
        +
      </button>
    </div>
  );
};

export default CountButton;
