import classNames from 'classnames/bind';
import { ReactNode } from 'react';

import { LeftSlotType, MiddleSlotType } from '../../model/types';
import { LeftSlot } from '../LeftSlot/LeftSlot';
import { MiddleSlot } from '../MiddleSlot/MiddleSlot';

import css from './LayoutHeader.module.css';

const cn = classNames.bind(css);

interface LayoutHeaderProps {
  leftSlotType?: LeftSlotType;
  middleSlotType?: MiddleSlotType;
  rightSlot?: ReactNode;
}

export const LayoutHeader = ({ leftSlotType = 'none', middleSlotType = 'none', rightSlot }: LayoutHeaderProps) => {
  return (
    <div className={cn('root')}>
      <div className={cn('slot', ' leftSlot')}>
        <LeftSlot type={leftSlotType} />
      </div>
      <div className={cn('slot', 'middleSlot')}>
        <MiddleSlot type={middleSlotType} />
      </div>
      <div className={cn('slot', 'rightSlot')}>{rightSlot}</div>
    </div>
  );
};
