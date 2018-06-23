'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { addTodo } from 'reducers/todos/action-creators';

export const Form = ({ handleAddTodo }) => (
  <form onSubmit={handleAddTodo}>
    <input type='text' name='todo' />
    <button type='submit'>Add Todo</button>
  </form>
);

Form.propTypes = {
  handleAddTodo: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  handleAddTodo: e => {
    e.preventDefault();

    dispatch(addTodo(e.target['todo'].value));
    e.target['todo'].value = '';
  }
});

export default connect(null, mapDispatchToProps)(Form);
