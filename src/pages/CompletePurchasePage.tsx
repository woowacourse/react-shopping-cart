import { useNavigate } from 'react-router-dom';

import Header from '../components/Header/Header';
import { Button } from '../components/common/Button/Button.style';
import CompletePurchaseSection from '../components/CompletePurchaseSection/CompletePurchaseSection';

const CompletePurchasePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <CompletePurchaseSection />
      <Button
        color="primary"
        width="full"
        radius={0}
        size="l"
        style={{ position: 'fixed', maxWidth: '768px', bottom: '0' }}
        onClick={() => {
          navigate('/');
        }}
      >
        장바구니로 돌아가기
      </Button>
    </>
  );
};
export default CompletePurchasePage;
