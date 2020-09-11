import React from 'react';
import { Switch, Route } from 'react-router-dom';
//import compoents
import HomeContainer from './components/HomeContainer.js';
import TodoContainer from './components/TodoContainer';

const Router = () => (
    //define path and use component
    <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route exact path="/todos" component={TodoContainer} />
    </Switch>
)

export default Router