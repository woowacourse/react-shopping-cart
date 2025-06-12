import useCoupons from '../../hooks/useCoupons';
import { CouponsContext } from './CouponsContext';

type CouponsProviderProps = {
  children: React.ReactNode;
};

export const CouponsProvider = ({ children }: CouponsProviderProps) => {
  const couponsValue = useCoupons();
  return (
    <CouponsContext.Provider value={couponsValue}>
      {children}
    </CouponsContext.Provider>
  );
};

export default CouponsProvider;
