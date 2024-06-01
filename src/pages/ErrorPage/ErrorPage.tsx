import useNavigatePage from '@hooks/useNavigatePage';
import ROUTES from '@constants/routes';
import Button from '@components/common/Button';
import Header from '@components/Header/Header';
import styles from './ErrorPage.module.css';

interface Props {
  errorMessage: string;
}

export default function ErrorPage({ errorMessage }: Props) {
  const navigateCartPage = useNavigatePage(ROUTES.CART);

  return (
    <>
      <Header>
        <Button variant="header" onClick={navigateCartPage}>
          SHOP
        </Button>
      </Header>
      <div className={styles.errorPageContainer}>
        <div>{errorMessage}</div>
        <span>잠시 후 다시 시도해주세요.</span>
        <Button className={styles.backButton} variant="image" onClick={navigateCartPage}>
          되돌아가기
        </Button>
      </div>
    </>
  );
}
