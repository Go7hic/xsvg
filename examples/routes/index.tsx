import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home';

export function getRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/home"></Redirect>
        <Route path="/home" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}
