'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import './markdown-editor-files.css';
import style from './markdown-editor-files.css.json';

const Files = ({ files, handleOpenFile }) => (
  <div className={style['files-list-container']}>
    <h2>Files</h2>
    <ul>
      {Object.keys(files).map(id => (
        <li key={id}>
          <button onClick={handleOpenFile(id)}>
            {files[id].title}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

Files.defaultProps = {
  files: {}
};

Files.propTypes = {
  files: PropTypes.object,
  handleOpenFile: PropTypes.func.isRequired
};

export default Files;
