'use strict';

import React from 'react';
import PropTypes from 'prop-types';

const Dots = () => <span>...</span>;

const Page = ({ page, url, callback }) => {
  const Component = page === '...' ? Dots : 'a';

  const onClicked = !callback ? null : e => {
    e.preventDefault();
    callback(page);
  };

  return (
    <Component href={`${url}=${page}`} onClick={onClicked}>
      {page}
    </Component>
  );
};

Page.defaultProps = {
  url: '#'
};

Page.propTypes = {
  page: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  url: PropTypes.string,
  callback: PropTypes.func
};

export default Page;
