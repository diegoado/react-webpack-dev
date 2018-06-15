'use strict';

import React, { Component } from 'react';

import AppContent from './components/app-content';

const ENTER = 13;
const BASE_GITHUB_URL = 'https://api.github.com/users/';

class App extends Component {
  constructor () {
    super();
    this.state = {
      userInfo: undefined,
      repos: undefined,
      starred: undefined,
      isFetching: false
    };

    this.searchHandle = ::this.searchHandle;
    this.actionHandle = ::this.actionHandle;
  }

  static getGitHubApiURL (username, repositoryType = '', page = 1) {
    return `${BASE_GITHUB_URL}${username}${repositoryType}?per_page=${5}&page=${page}`;
  }

  searchHandle (event) {
    const keyCode = event.which || event.keyCode;

    if (keyCode === ENTER) {
      this.setState({
        userInfo: undefined,
        repos: undefined,
        starred: undefined,
        isFetching: true
      });

      const url = App.getGitHubApiURL(event.target.value);

      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then(data => {
          this.setState({
            userInfo: {
              name: data['name'],
              login: data['login'],
              avatar: data['avatar_url'],
              followers: data['followers'],
              following: data['following'],
              repositories: data['public_repos']
            }
          });
        })
        .catch(error => {
          console.log(`Error caused by: ${error.message}`);
        })
        .finally(() => {
          this.setState({ isFetching: false });
        });
    }
  }

  actionHandle (repositoryType, page = 1) {
    const username = this.state.userInfo.login;
    const url = App.getGitHubApiURL(username, '/' + repositoryType, page);

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        const link = response.headers.get('link') || '';
        const totalPages = link.match(/&page=(\d+)>; rel="last"/);

        const result = async () => {
          return {
            pagination: {
              total: totalPages ? +totalPages[1] : page,
              activePage: page
            },
            data: await response.json()
          };
        };
        return result();
      })
      .then(({ data, pagination }) => {
        this.setState({
          [repositoryType]: {
            repos: data.map(repository => ({
              id: repository['id'],
              name: repository['name'],
              link: repository['html_url']
            })),
            pagination: pagination
          }
        });
      })
      .catch(error => {
        console.log(`Error caused by: ${error.message}`);
      });
  }

  render () {
    return (
      <AppContent
        {...this.state}
        actionHandle={this.actionHandle}
        searchHandle={this.searchHandle}
      />
    );
  }
}

export default App;
