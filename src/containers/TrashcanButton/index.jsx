import React from 'react';

import Image from 'components/Image';

function TrashcanButton() {
  const handleClickTrashButton = () => {};

  return (
    <Image
      src={process.env.PUBLIC_URL + '/img/trashcan.png'}
      width="24px"
      height="24px"
      alt="휴지통 이미지"
      onClick={handleClickTrashButton}
    />
  );
}

export default TrashcanButton;
