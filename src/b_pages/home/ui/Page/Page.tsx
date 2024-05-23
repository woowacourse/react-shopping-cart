import { ContentHeader } from '@/c_widgets/ContentHeader';
import { LayoutHeader } from '@/c_widgets/LayoutHeader';
import { Layout } from '@/f_shared';

export const HomePage = () => {
  return (
    <Layout
      headerSlot={<LayoutHeader middleSlotType='logo' />}
      contentHeaderSlot={<ContentHeader title={'메인 페이지'} desc={`임시 메인 페이지 입니다.`}></ContentHeader>}
      contentBodySlot={
        <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
          <h4>메인 페이지</h4>
        </div>
      }
      footerSlot={<button style={{ width: '100%', height: '64px' }}>장바구니 바로가기</button>}
    />
  );
};
