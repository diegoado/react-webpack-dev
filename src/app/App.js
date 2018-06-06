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
      starred: []
    };
  }

  searchHandle (event) {
    const keyCode = event.which || event.keyCode;
    const eTarget = event.target;

    if (keyCode === ENTER) {
      eTarget.disabled = true;

      fetch(`https://api.github.com/users/${eTarget.value}`)
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
              repositories: data['public_repos'],
              followers: data['followers'],
              following: data['following']
            },
            repos: [],
            starred: []
          });
        })
        .catch(error => {
          console.log(`Error caused by: ${error.message}`);
        })
        .finally(() => {
          eTarget.disabled = false;
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
        searchHandle={event => this.searchHandle(event)}
        reposHandle={() => this.repositoriesHandle('repos')}
        starredHandle={() => this.repositoriesHandle('starred')}
      />
    );
  }
}

export default App;
