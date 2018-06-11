'use strict';

const pagination = ({ activePage, total }) => {
  return Array.from({ length: total }, (_, i) => i + 1);
};

export default pagination;
