import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Signin from './Signin';
import Signup from './Signup';
import Home from './Home';
import createBrowserHistory from '../../node_modules/history/createBrowserHistory';

const browserHistory = createBrowserHistory();

const unauthenticatedPages = ['/', '/Signup'];
const authenticatedPages = ['/Home'];
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/Home');
  }
};

const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
};

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/Home');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};

export class Main extends React.Component{
    render(){
        return(
            <main>
                <div>
                    <Switch>
                        <Route exact path='/' component={Signin}/>
                        <Route exact path='/Signup' component={Signup}/>
                        <Route exact path='/Home' component={Home}/>
                    </Switch>
                </div>
            </main>
        );  
    }
}    