import * as S from "./index.styles";

const GridWrapper = ({
  children,
}: {
  children?: boolean | React.ReactElement | React.ReactElement[] | undefined;
}) => {
  return <S.GridWrapper>{children}</S.GridWrapper>;
};

export default GridWrapper;
