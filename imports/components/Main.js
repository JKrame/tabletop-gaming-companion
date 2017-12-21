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
                        <Route exact path='/adventureboard' component={AdventureBoard}/>
                        <Route exact path='/binder' component={Binder}/>
                        <Route exact path='/campaigns' component={Campaigns}/>
                        <Route exact path='/campaign/*' component={CampaignScreen}/>
                        <Route exact path='/campaign/edit/*' component={CampaignSetup}/>
                        <Route exact path='/characters' component={Characters}/>
                        <Route exact path='/characters/edit/*' component={CharacterSheets}/>
                        <Route exact path='/home' component={Home}/>
                        <Route exact path='/mail' component={Mail}/>
                        <Route exact path='/nearbyplayers' component={NearbyPlayers}/>
                        <Route exact path='/settings' component={Settings}/>
                        <Route exact path='/' component={Signin}/>
                        <Route exact path='/signup' component={Signup}/>
                    </Switch>
                </div>
            </main>
        );  
    }
}    