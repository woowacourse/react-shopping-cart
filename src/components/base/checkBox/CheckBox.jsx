const { BaseLabel, BaseCheckBox } = require('./style');

const Checkbox = ({ label }) => {
  return (
    <BaseLabel>
      <BaseCheckBox type="checkbox" />
      {label}
    </BaseLabel>
  );
};

export default Checkbox;
