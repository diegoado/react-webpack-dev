'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import FilterLink from './filter-link';
import { setFilter } from 'reducers/visibility-filter/action-creators';

import {
  SHOW_ALL,
  SHOW_ACTIVE,
  SHOW_COMPLETED
} from 'reducers/visibility-filter/actions';

const mapFilters = [
  { label: 'All', name: SHOW_ALL },
  { label: 'Finished', name: SHOW_ACTIVE },
  { label: 'To do', name: SHOW_COMPLETED }
];

const Filter = ({ visibilityFilter, handleFilter }) => (
  <div>
    <h3>Show</h3>
    {mapFilters.map(filter => (
      <FilterLink
        key={filter.name}
        name={filter.name}
        selectedFilter={visibilityFilter}
        handleClick={handleFilter(filter.name)}>
        {filter.label}
      </FilterLink>
    ))}
  </div>
);

Filter.propTypes = {
  visibilityFilter: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  visibilityFilter: state.visibilityFilter
});

const mapDispatchToProps = dispatch => ({
  handleFilter: filter => {
    return e => {
      e.preventDefault();
      dispatch(setFilter(filter));
    };
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
