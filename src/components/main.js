import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Header from './header'
import Home from './home'

class Main extends Component {

  render() {
    return <div>
      <Header/>
      <Route exact path="/" component={Home} />
    </div>
  }
}

export default Main;
