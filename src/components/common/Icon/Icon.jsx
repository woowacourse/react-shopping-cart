import Icons from './icons';

function Icon({ iconName, size = '24' }) {
  const IconComponent = Icons[iconName];
  return <IconComponent width={size} height={size} />;
}

export default Icon;
