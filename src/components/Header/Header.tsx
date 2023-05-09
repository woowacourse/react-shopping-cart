import Logo from '../../assets/logo.svg';
import styles from './style.module.css';

const Header = () => {
  // useRecoilValue

  return (
    <header className={styles.container}>
      <img src={Logo} alt="logo" />
      <button type="button" className={styles.cartButton}>
        장바구니 <span>0</span>
      </button>
    </header>
  );
};

export default Header;
