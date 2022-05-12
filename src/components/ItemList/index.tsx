import ItemContainer from 'components/ItemList/ItemContainer';
import styled from 'styled-components';
import useCartList from 'hooks/useCartList';
import useSnackBar from 'hooks/useSnackBar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LOCAL_BASE_URL } from 'apis';
import { Item } from 'types/domain';
import axios from 'axios';

import Loading from 'components/common/Loading';
import RequestFail from 'components/common/RequestFail';

const ItemList = () => {
  const [itemList, setItemList] = useState<Item[]>([]);
  const { updateCartItemQuantity, error, loading } = useCartList();
  const { openSnackbar } = useSnackBar();

  const params = useParams();
  const id = Number(params.id);

  useEffect(() => {
    (async () => {
      const res = await axios.get(`${LOCAL_BASE_URL}/itemList?_page=${id}&_limit=12`);

      setItemList(res.data);
    })();
  }, [id]);

  if (error) return <RequestFail />;

  return (
    <StyledRoot>
      {itemList.map(item => (
        <ItemContainer
          key={item.id}
          id={item.id}
          thumbnailUrl={item.thumbnailUrl}
          price={item.price}
          title={item.title}
          updateCartItemQuantity={updateCartItemQuantity}
          openSnackbar={openSnackbar}
        />
      ))}
    </StyledRoot>
  );
};

const StyledRoot = styled.div`
  width: 1300px;
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  gap: 2.7rem 5.73rem;
`;

export default ItemList;
