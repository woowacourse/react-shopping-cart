import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL, URL_LOCATION } from '../constants/url';

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const getHeaderContent = () => {
    if (pathname === BASE_URL + URL_LOCATION.BASE) return <S.Title>SHOP</S.Title>;
    if (pathname === BASE_URL + URL_LOCATION.ORDER)
      return (
        <button>
          <img
            src="./go-back.svg"
            alt="goBack"
            onClick={() => navigate(BASE_URL + URL_LOCATION.BASE)}
          />
        </button>
      );
    return <></>;
  };

  const headerContent = getHeaderContent();

  return <S.Container>{headerContent}</S.Container>;
};

const S = {
  Container: styled.header`
    display: flex;
    align-items: center;
    width: 100%;
    height: 64px;
    padding: 0 24px;
    background-color: black;
  `,

  Title: styled.p`
    user-select: none;
    color: white;
    font-size: 20px;
    font-weight: 800;
  `,
};

export default Header;
