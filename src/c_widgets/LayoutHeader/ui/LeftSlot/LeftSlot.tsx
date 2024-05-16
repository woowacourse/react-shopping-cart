import classNames from 'classnames/bind';

import { imgMap } from '../../../../f_shared/index';
import { LayoutHeaderType } from '../../model/types';

import css from './LeftSlot.module.css';

const cn = classNames.bind(css);

const srcMap: Record<LayoutHeaderType, string> = {
  logo: imgMap.logoBlack,
  goBack: imgMap.goBackBlack,
};

interface LeftSlotProps {
  type: LayoutHeaderType;
}

// TODO: Add Router Link
export const LeftSlot = ({ type }: LeftSlotProps) => {
  return <img src={srcMap[type]} alt={type} className={cn('image')} />;
};
