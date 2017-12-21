import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from '../imports/components/App';
import { onAuthChange } from '../imports/components/Main';


Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  console.log("auth change baby!" + isAuthenticated);
  
  onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  ReactDOM.render(<App />, document.getElementById('root'));  
});   
