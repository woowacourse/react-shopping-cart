import classNames from 'classnames/bind';
import { useNavigate } from 'react-router';

import { imgMap, Button, urls } from '@/f_shared';

import { MiddleSlotType } from '../types';

import css from './MiddleSlot.module.css';

const cn = classNames.bind(css);

interface MiddleSlotProps {
  type: MiddleSlotType;
}

export const MiddleSlot = ({ type }: MiddleSlotProps) => {
  const navigate = useNavigate();

  const handleLogoButtonClick = () => {
    navigate(urls.root);
  };

  switch (type) {
    case 'none':
      return null;

    case 'logo':
      return (
        <Button className={cn('button')} onClick={handleLogoButtonClick}>
          <img src={imgMap.logo_dark} alt={type} className={cn('image')} />
        </Button>
      );
  }
};
