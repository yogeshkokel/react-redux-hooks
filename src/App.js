import React from 'react';
import { Provider } from 'react-redux';
//import store
import store from './store/index';
// import router
import Router from './Router';
//import i18n
import './plugins/i18n';
//import compoents
import Header from './components/partials/Header';
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
