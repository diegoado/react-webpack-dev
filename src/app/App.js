'use strict';

import React, { Component } from 'react';

import marked from 'marked';
import { v4 } from 'uuid';

import MarkdownEditor from './components/markdown-editor';

import './App.css';

import('highlight.js').then(highlight => {
  marked.setOptions({
    highlight: (code, language) => {
      let languageSubset;

      if (language && highlight.getLanguage(language)) {
        languageSubset = [language];
      }
      return highlight.highlightAuto(code, languageSubset).value;
    }
  });
});

class App extends Component {
  constructor () {
    super();
    this.state = {
      id: v4(),
      value: '',
      isSaving: null,
      files: {}
    };
    this.handleSaving = ::this.handleSaving;

    this.handleCreate = ::this.handleCreate;
    this.handleChange = ::this.handleChange;
    this.handleRemove = ::this.handleRemove;
    this.parserMarkup = ::this.parserMarkup;

    this.handleOpenFile = ::this.handleOpenFile;
  }

  handleSaving () {
    if (this.state.isSaving) {
      const files = {
        ...this.state.files,
        [this.state.id]: {
          title: this.state.title || 'No Subject',
          content: this.state.value
        }
      };

      localStorage.setItem('markdown-editor', JSON.stringify(files));
      this.setState({ isSaving: false, files: files });
    }
  }

  handleCreate () {
    this.setState({
      id: v4(),
      title: '',
      value: '',
      isSaving: null
    });
    this.markup.focus();
  }

  handleChange (field) {
    return (event) => {
      this.setState({
        [field]: event.target.value,
        isSaving: true });
    };
  }

  handleRemove () {
    // eslint-disable-next-line no-unused-vars
    const { [this.state.id]: id, ...files } = this.state.files;
    localStorage.setItem('markdown-editor', JSON.stringify(files));

    this.setState({
      id: v4(),
      title: '',
      value: '',
      isSaving: null,
      files: files
    });
    this.markup.focus();
  }

  handleOpenFile (fileId) {
    return () => {
      this.setState({
        id: fileId,
        title: this.state.files[fileId].title,
        value: this.state.files[fileId].content
      });
    };
  }

  parserMarkup () {
    return {__html: marked(this.state.value)};
  }

  componentDidMount () {
    const files = JSON.parse(localStorage.getItem('markdown-editor'));
    this.setState({ files });
  }

  componentDidUpdate () {
    clearInterval(this.timer);
    this.timer = setTimeout(this.handleSaving, 300);
  }

  componentWillUnmount () {
    clearInterval(this.timer);
  }

  render () {
    return (
      <MarkdownEditor
        {...this.state}
        handleCreate={this.handleCreate}
        handleChange={this.handleChange}
        handleRemove={this.handleRemove}
        parserMarkup={this.parserMarkup}
        handleOpenFile={this.handleOpenFile}
        markupRef={node => { this.markup = node; }}
      />
    );
  }
}

export default App;
