import React from 'react';
import PropTypes from 'prop-types';
import {BadgeBox} from 'components/common/Badge/style';

export default function Badge({count}) {
  return <BadgeBox>{count}</BadgeBox>;
}

Badge.propTypes = {
  count: PropTypes.number,
};
