import React, { Component } from 'react';
import Main from './components/main';
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import promiseMiddleware from 'redux-promise-middleware'
import reducers from './reducers'

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware())(createStore)
const store = createStoreWithMiddleware(reducers)

class App extends Component {

  render() {
    return (
      <Provider store={store} >
        <Main />
      </Provider>
    )
  }

}

export default App;
