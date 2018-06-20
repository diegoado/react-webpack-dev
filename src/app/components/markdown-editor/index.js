'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import Header from '../markdown-editor-header';
import Files from '../markdonw-editor-files';

import './markdown-editor.css';
import style from './markdown-editor.css.json';

const MarkdownEditor = (
  { value, files, handleChange, handleOpenFile, parserMarkup, markupRef, ...props }
) => (
  <section className={style['editor']}>
    <Header handleChange={handleChange} {...props} />
    <Files files={files} handleOpenFile={handleOpenFile} />
    <textarea className={style['text-area']}
      value={value} onChange={handleChange('value')} ref={markupRef} autoFocus />
    <article className={style['view']} dangerouslySetInnerHTML={parserMarkup()} />
  </section>
);

MarkdownEditor.propTypes = {
  files: PropTypes.array,
  value: PropTypes.string.isRequired,
  markupRef: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  parserMarkup: PropTypes.func.isRequired,
  handleOpenFile: PropTypes.func.isRequired
};

export default MarkdownEditor;
