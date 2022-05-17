const { BaseLabel, BaseCheckBox } = require('./style');

const Checkbox = ({ label, ...rest }) => {
  return (
    <BaseLabel>
      <BaseCheckBox {...rest} type="checkbox" />
      {label}
    </BaseLabel>
  );
};

export default Checkbox;
