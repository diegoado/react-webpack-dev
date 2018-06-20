'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import Button from '../markdown-editor-button';

import './markdown-editor-header.css';
import style from './markdown-editor-header.css.json';

const MarkdownEditorHeader = ({ title, isSaving, handleCreate, handleRemove, handleChange }) => (
  <header className={style['editor-header']}>
    { isSaving !== null && (
      <p className={style['save-message']}>
        { isSaving ? 'Saving...' : 'Save!' }
      </p>
    )}
    <input
      type='text' placeholder='No subject'
      value={title} onChange={handleChange('title')}
    />
    <Button handleClick={handleCreate} subClassType='button-create'>
      New File
    </Button>
    <Button handleClick={handleRemove} subClassType='button-remove'>
      Remove
    </Button>
  </header>
);

MarkdownEditorHeader.defaultProps = {
  title: '',
  isSaving: null
};

MarkdownEditorHeader.propTypes = {
  title: PropTypes.string,
  isSaving: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
};

export default MarkdownEditorHeader;
