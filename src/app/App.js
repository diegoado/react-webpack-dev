'use strict';

import React, { Component } from 'react';

import AppContent from './components/app-content';

const ENTER = 13;

class App extends Component {
  constructor () {
    super();
    this.state = {
      userInfo: null,
      repos: [],
      starred: [],
      isFetching: false
    };

    this.searchHandle = ::this.searchHandle;
  }

  searchHandle (event) {
    const keyCode = event.which || event.keyCode;

    if (keyCode === ENTER) {
      this.setState({
        userInfo: null,
        repos: [],
        starred: [],
        isFetching: true
      });

      fetch(`https://api.github.com/users/${event.target.value}`)
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then(data => {
          const userInfo = {
            name: data['name'],
            login: data['login'],
            avatar: data['avatar_url'],
            followers: data['followers'],
            following: data['following'],
            repositories: data['public_repos']
          };
          this.setState({
            userInfo: userInfo
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

  repositoriesHandle (repositoryType) {
    const username = this.state.userInfo.login;

    fetch(`https://api.github.com/users/${username}/${repositoryType}`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        this.setState({
          [repositoryType]: data.map(repository => ({
            id: repository['id'],
            name: repository['name'],
            link: repository['html_url']
          }))
        });
      })
      .catch(error => {
        console.log(`Error caused by: ${error.message}`);
      });
  }

  render () {
    return (
      <AppContent
        userInfo={this.state.userInfo}
        repositories={this.state.repos}
        starred={this.state.starred}
        isFetching={this.state.isFetching}
        searchHandle={this.searchHandle}
        reposHandle={() => this.repositoriesHandle('repos')}
        starredHandle={() => this.repositoriesHandle('starred')}
      />
    );
  }
}

export default App;
