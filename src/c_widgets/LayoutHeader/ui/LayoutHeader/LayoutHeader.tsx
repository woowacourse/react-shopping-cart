import classNames from 'classnames/bind';
import { ReactNode } from 'react';

import { LeftSlotType, MiddleSlotType } from '../../consts/types';
import { LeftSlot } from '../LeftSlot/LeftSlot';
import { MiddleSlot } from '../MiddleSlot/MiddleSlot';

import css from './LayoutHeader.module.css';

const cn = classNames.bind(css);

interface LayoutHeaderProps {
  color?: string;
  leftSlotType?: LeftSlotType;
  middleSlotType?: MiddleSlotType;
  rightSlot?: ReactNode;
}

export const LayoutHeader = ({
  color: backgroundColor,
  leftSlotType = 'none',
  middleSlotType = 'none',
  rightSlot,
}: LayoutHeaderProps) => {
  return (
    <div style={{ backgroundColor }} className={cn('root')}>
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
