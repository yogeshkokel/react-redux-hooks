import React from 'react';
import { Provider } from 'react-redux';
import store from './store/index';

import Header from './components/partials/Header';
import Router from './Router';
//CSS Imports
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={store}>
      <Header />
      <div className="App">
        <Router />
      </div>
    </Provider >
  );
}

export default App;
