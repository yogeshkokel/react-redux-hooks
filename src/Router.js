import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomeContainer from './components/HomeContainer.js';
import TodoContainer from './components/TodoContainer';

const Router = () => (
    <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route exact path="/todos" component={TodoContainer} />
    </Switch>
)

export default Router