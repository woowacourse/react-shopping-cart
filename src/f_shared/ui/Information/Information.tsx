import { imgMap } from '../../assets/imgMap';
import { Text } from '../Text/Text';

import css from './Information.module.css';

interface InformationProps {
  children: string;
}

export const Information = ({ children }: InformationProps) => {
  return (
    <div className={css.root}>
      <img src={imgMap.information} alt={'img'} className={css.img} />
      <Text tag={'span'} type={'b2'}>
        {children}
      </Text>
    </div>
  );
};
