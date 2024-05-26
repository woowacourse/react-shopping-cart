import * as Styled from './style';

import { useLocation, useNavigate } from 'react-router-dom';

import {
  generateHeaderTitle,
  generatePrevPageNavigatorPath,
} from '../../utils/utils';

const Header = () => {
  const page = useLocation().pathname;
  const navigator = useNavigate();

  return (
    <Styled.Header>
      <Styled.AppTitle
        onClick={() => navigator(generatePrevPageNavigatorPath(page))}
      >
        {generateHeaderTitle(page)}
      </Styled.AppTitle>
    </Styled.Header>
  );
};

export default Header;
