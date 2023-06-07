import SubmitModalTemplate from '../../templates/SubmitModalTemplate';
import { deleteModalState } from '../../../service/atom';

const DeleteCartItemModal = () => {
  return (
    <SubmitModalTemplate modalState={deleteModalState} title="해당 상품을 삭제하시겠습니까?" />
  );
};

export default DeleteCartItemModal;
