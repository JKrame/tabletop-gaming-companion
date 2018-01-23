import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AdventureBoard from './AdventureBoard';
import Binder from './Binder';
import Campaigns from './Campaigns';
import CampaignScreen from './CampaignScreen';
import CampaignSetup from './CampaignSetup';
import Characters from './Characters';
import CharacterSheet from './CharacterSheet';
import Home from './Home';
import Mail from './Mail';
import NearbyPlayers from './NearbyPlayers';
import Settings from './Settings';
import Signin from './Signin';
import Signup from './Signup';
import createBrowserHistory from '../../node_modules/history/createBrowserHistory';
import { Meteor } from 'meteor/meteor'

const browserHistory = createBrowserHistory();

const unauthenticatedPages = ['/*', '/signin', '/signup'];
const authenticatedPages = ['/adventureboard', '/binder', '/campaign', 'campaign/*', '/campaign/edit/*', 
                            '/characters', 'characters/edit/*', '/home', '/mail', '/nearbyplayers', '/settings'];

const onEnterPublicPage = () => {
    console.log("onEnterPublicPage");
    
    if (Meteor.userId()) {
        browserHistory.replace('/home');
    }
};

const onEnterPrivatePage = () => {
    console.log("onEnterPrivatePage");
    
    if (!Meteor.userId()) {
        browserHistory.replace('/signin');
    }
};

export const onAuthChange = (isAuthenticated) => {
    const pathname = browserHistory.location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);

    if (isUnauthenticatedPage && isAuthenticated) {
        browserHistory.replace('/home');
    } else if (isAuthenticatedPage && !isAuthenticated) {
        window.location.assign('/signin');
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
                        <Route exact path='/character/edit/:characterID' component={CharacterSheet}/>
                        <Route exact path='/home' component={Home}/>
                        <Route exact path='/mail' component={Mail}/>
                        <Route exact path='/nearbyplayers' component={NearbyPlayers}/>
                        <Route exact path='/settings' component={Settings}/>
                        <Route exact path='/*' component={Signin}/>
                        <Route exact path='/signin' component={Signin}/>
                        <Route exact path='/signup' component={Signup}/>
                    </Switch>
                </div>
            </main>
        );  
    }
}