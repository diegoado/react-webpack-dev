'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { toggleTodo } from 'reducers/todos/action-creators';
import { SHOW_ACTIVE, SHOW_COMPLETED } from 'reducers/visibility-filter/actions';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed);
    case SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

export const TodosList = ({ todos, visibilityFilter, handleToggleTodo }) => (
  <ul>
    {getVisibleTodos(todos, visibilityFilter).map(todo => (
      <li
        key={todo.id}
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        onClick={handleToggleTodo(todo.id)}
      >
        {todo.text}
      </li>
    ))}
  </ul>
);

TodosList.defaultProps = {
  todos: []
};

TodosList.propTypes = {
  todos: PropTypes.array,
  visibilityFilter: PropTypes.string.isRequired,
  handleToggleTodo: PropTypes.func.isRequired
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  handleToggleTodo: id => {
    return () => {
      dispatch(toggleTodo(id));
    };
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TodosList);
