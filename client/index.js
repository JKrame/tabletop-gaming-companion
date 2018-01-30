import React from 'react'
import ReactDOM from 'react-dom';
import App from '../imports/components/App';
import {Tracker} from 'meteor/tracker';

import { onAuthChange } from '../imports/components/Main';
import { BrowserRouter } from 'react-router-dom'
//import { Characters } from '../imports/api/character';

Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId();
    onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
    ReactDOM.render(<App />, document.getElementById('root'));  
});   