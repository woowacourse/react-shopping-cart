import IconBack from '/public/icon/ic_back.svg';
import { ROUTE } from '../../../constants/systemConstants';
import { HeaderStyle } from '../header/Header.styles';
import * as S from './HeaderWithBack.styles';

const Header = () => {
  return (
    <section css={HeaderStyle}>
      <a href={ROUTE.HOME}>
        <img src={IconBack} alt="back" css={S.IconBackStyle} />
      </a>
    </section>
  );
};

export default Header;
