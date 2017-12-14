import { Meteor } from 'meteor/meteor';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

React.DOM.render((
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Signin} />
        </Switch>
    </BrowserRouter>
))