import { useNavigate } from 'react-router-dom';

import { ContentHeader } from '@/c_widgets/ContentHeader';
import { LayoutHeader } from '@/c_widgets/LayoutHeader';
import { Layout, urls } from '@/f_shared';

export const HomePage = () => {
  const navigate = useNavigate();

  const handleCartItemClick = () => {
    navigate(urls.cart);
  };

  return (
    <Layout
      headerSlot={<LayoutHeader middleSlotType='logo' />}
      contentHeaderSlot={<ContentHeader title={'메인 페이지'} desc={`임시 메인 페이지 입니다.`}></ContentHeader>}
      contentBodySlot={<></>}
      footerSlot={
        <button onClick={handleCartItemClick} style={{ width: '100%', height: '64px' }}>
          장바구니 바로가기
        </button>
      }
    />
  );
};
