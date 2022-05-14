import Icons from './icons';

function Icon({ iconName, size = '24', fill, stroke }) {
  const IconComponent = Icons[iconName];
  return <IconComponent width={size} height={size} fill={fill} stroke={stroke} />;
}

export default Icon;
