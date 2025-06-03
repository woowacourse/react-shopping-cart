import { PriceInfoContainerStyle } from './PriceInfo.styles';

function PriceInfoContainer({ children }: { children: React.ReactNode }) {
  return <section css={PriceInfoContainerStyle}>{children}</section>;
}

export default PriceInfoContainer;
