'use strict';

const centerPage = ({ activePage, total }) => {
  return activePage - 1 <= 0 ? 1
    : activePage === total ? activePage - 2 : activePage - 1;
};

const isNumber = (value) => typeof value === 'number';

const pagination = ({ activePage = 1, total = 1 } = {}) => {
  if (!isNumber(activePage) || !isNumber(total)) {
    throw TypeError('total and activePage should be a number');
  }

  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  let pages = [
    1,
    ...Array.from({ length: 3 }, (_, i) => i + centerPage({ activePage, total })),
    total
  ];

  pages = pages.filter((page, index, array) => array.indexOf(page) === index);

  const firstPage = pages[0];

  if (pages[1] === firstPage + 2) {
    pages = [
      firstPage,
      firstPage + 1,
      ...pages.slice(1)
    ];
  } else if (pages[1] > firstPage + 2) {
    pages = [
      firstPage,
      '...',
      ...pages.slice(1)
    ];
  }

  const lastPage = pages[pages.length - 1];

  if (pages[pages.length - 2] === lastPage - 2) {
    pages = [
      ...pages.slice(0, -1),
      lastPage - 1,
      lastPage
    ];
  } else if (pages[pages.length - 2] < lastPage - 2) {
    pages = [
      ...pages.slice(0, -1),
      '...',
      lastPage
    ];
  }

  return pages;
};

export default pagination;
