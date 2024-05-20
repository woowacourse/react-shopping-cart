import classNames from 'classnames/bind';

import { imgMap } from '../../../../f_shared/index';
import { MiddleSlotType } from '../../model/types';

import css from './MiddleSlot.module.css';

const cn = classNames.bind(css);

interface MiddleSlotProps {
  type: MiddleSlotType;
}

// TODO: Add Router Link
export const MiddleSlot = ({ type }: MiddleSlotProps) => {
  switch (type) {
    case 'none':
      return null;

    case 'logo':
      return (
        <button className={cn('button')}>
          <img src={imgMap.logo} alt={type} className={cn('image')} />
        </button>
      );
  }
};
