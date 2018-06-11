'use strict';

import { expect } from 'chai';

import pagination from './index';

it('pagination should be a function', () => {
  expect(pagination).to.be.a('function');
});

it('pagination({activePage: 1, total: 1}) should return [1]', () => {
  const params = {activePage: 1, total: 1};
  const result = [1];

  expect(pagination(params)).to.be.deep.equal(result);
});

it('pagination({activePage: 1, total: 2}) should return [1, 2]', () => {
  const params = {activePage: 1, total: 2};
  const result = [1, 2];

  expect(pagination(params)).to.be.deep.equal(result);
});

it('pagination({activePage: 1, total: 5}) should return [1, 2, 3, 4, 5]', () => {
  const params = {activePage: 1, total: 5};
  const result = [1, 2, 3, 4, 5];

  expect(pagination(params)).to.be.deep.equal(result);
});

it('pagination({activePage: 1, total: 6}) should return [1, 2, 3, "...", 6]', () => {
  const params = {activePage: 1, total: 6};
  const result = [1, 2, 3, '...', 6];

  expect(pagination(params)).to.be.deep.equal(result);
});

it('pagination({activePage: 2, total: 6}) should return [1, 2, 3, "...", 6]', () => {
  const params = {activePage: 2, total: 6};
  const result = [1, 2, 3, '...', 6];

  expect(pagination(params)).to.be.deep.equal(result);
});

it('pagination({activePage: 3, total: 6}) should return [1, 2, 3, 4, 5, 6]', () => {
  const params = {activePage: 3, total: 6};
  const result = [1, 2, 3, 4, 5, 6];

  expect(pagination(params)).to.be.deep.equal(result);
});

it('pagination({activePage: 4, total: 6}) should return [1, 2, 3, 4, 5, 6]', () => {
  const params = {activePage: 4, total: 6};
  const result = [1, 2, 3, 4, 5, 6];

  expect(pagination(params)).to.be.deep.equal(result);
});

it('pagination({activePage: 5, total: 6}) should return [1, "...", 4, 5, 6]', () => {
  const params = {activePage: 5, total: 6};
  const result = [1, '...', 4, 5, 6];

  expect(pagination(params)).to.be.deep.equal(result);
});

it('pagination({activePage: 6, total: 6}) should return [1, "...", 4, 5, 6]', () => {
  const params = {activePage: 6, total: 6};
  const result = [1, '...', 4, 5, 6];

  expect(pagination(params)).to.be.deep.equal(result);
});

it('pagination({activePage: 8, total: 15}) should return [1, "...", 7, 8, 9, "...", 15]', () => {
  const params = {activePage: 8, total: 15};
  const result = [1, '...', 7, 8, 9, '...', 15];

  expect(pagination(params)).to.be.deep.equal(result);
});
