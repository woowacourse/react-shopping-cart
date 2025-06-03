import { PriceInfoWrapperStyle } from './PriceInfo.styles';

function PriceInfoWrapper({ children }: { children: React.ReactNode }) {
  return <div css={PriceInfoWrapperStyle}>{children}</div>;
}

export default PriceInfoWrapper;
