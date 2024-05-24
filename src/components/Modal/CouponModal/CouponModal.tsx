// import 'soosoo-react-modal-component/dist/style.css';
// import { Modal } from 'soosoo-react-modal-component';
// import { useState } from 'react';
// import CouponList from '../CouponList/CouponList';
// import { Notification } from './CouponModal.style';
// import Caution from '../../../assets/caution.svg';

// export default function CouponModal({ isOpen }: { isOpen: boolean }) {
//   const [isOpenModal, setIsOpenModal] = useState(isOpen);
//   console.log(isOpenModal);

//   const modalFooterButtons = [
//     {
//       content: '총 6,000원 할인 쿠폰 사용하기',
//       onClick: () => setIsOpenModal(false),
//       className: 'confirmButton',
//     },
//   ];

//   return (
//     <Modal
//       position="center"
//       size="medium"
//       title={{ position: 'left', content: '쿠폰을 선택해 주세요' }}
//       isOpen={isOpenModal}
//       onClose={() => setIsOpenModal(false)}
//       closeButton={{ onClose: () => setIsOpenModal(false) }}
//       footerButtons={modalFooterButtons}
//     >
//       <div>
//         <Notification>
//           <img className="notification-img" src={Caution} />
//           <span className="notification-text">쿠폰은 최대 2개까지 사용할 수 있습니다.</span>
//         </Notification>
//         <CouponList />
//       </div>
//     </Modal>
//   );
// }
