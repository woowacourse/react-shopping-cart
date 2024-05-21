import classNames from 'classnames/bind';

import { imgMap, Button } from '@/f_shared';

import { LeftSlotType } from '../../model/types';

import css from './LeftSlot.module.css';

const cn = classNames.bind(css);

interface LeftSlotProps {
  type: LeftSlotType;
}

// TODO: Add Router Link
export const LeftSlot = ({ type }: LeftSlotProps) => {
  switch (type) {
    case 'none':
      return null;

    case 'goBack':
      return (
        <Button className={cn('button')}>
          <img src={imgMap.goBack} alt={type} className={cn('image')} />
        </Button>
      );
  }
};
