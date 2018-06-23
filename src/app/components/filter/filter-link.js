'use strict';

import React from 'react';
import PropTypes from 'prop-types';

const span = (children) => () => (
  <span style={{ marginRight: 10 }}>{children}</span>
);

const FilterLink = ({ name, selectedFilter, handleClick, children }) => {
  const Component = name === selectedFilter ? span(children) : 'a';

  return (
    <Component
      style={{ marginRight: 10 }}
      href='#'
      onClick={handleClick}>
      {children}
    </Component>
  );
};

FilterLink.propTypes = {
  name: PropTypes.string.isRequired,
  selectedFilter: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default FilterLink;
