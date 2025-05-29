import styled from '@emotion/styled';
import { usePageContext } from '../contexts/PageContext';

const Header = () => {
  const { page, setPage } = usePageContext();
  const headerContent =
    page === 'cart' ? (
      <S.title>SHOP</S.title>
    ) : (
      <button>
        <img src="/go-back.svg" alt="goBack" onClick={() => setPage('cart')} />
      </button>
    );

  return <S.container>{headerContent}</S.container>;
};

const S = {
  container: styled.header`
    display: flex;
    align-items: center;
    width: 100%;
    height: 64px;
    padding: 0 24px;
    background-color: black;
  `,

  title: styled.p`
    color: white;
    font-size: 20px;
    font-weight: 800;
  `,
};

export default Header;
