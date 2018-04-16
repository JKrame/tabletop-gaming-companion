import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AdventureBoard from './AdventureBoard';
import Binder from './Binder';
import CampaignsPage from './CampaignsPage';
import CampaignScreen from './CampaignScreen';
import CampaignSetup from './CampaignSetup';
import CharactersPage from './CharactersPage';
import CharacterSheet from './CharacterSheet';
import Header from './Header';
import Home from './Home';
import Mail from './Mail';
import NearbyPlayers from './NearbyPlayers';
import Settings from './Settings';
import Signin from './Signin';
import Signup from './Signup';
import createBrowserHistory from '../../node_modules/history/createBrowserHistory';
import { Meteor } from 'meteor/meteor'

const browserHistory = createBrowserHistory();
const isAuthenticated = !!Meteor.userId();

const unauthenticatedPages = ['/signin', '/signup'];
const authenticatedPages = ['/', '/*', '/adventureboard', '/binder', '/campaign', 'campaign/*', '/campaign/edit/*', 
                            '/characters', 'characters/edit/*', '/home', '/mail', '/nearbyplayers', '/settings'];



const onEnterPublicPage = () => {
    if (!!Meteor.userId()) {
        browserHistory.push('/home');
    }
};

const onEnterPrivatePage = () => {
    if (!Meteor.userId()) {
        browserHistory.push('/signin');
    }
};

export class Main extends React.Component{

    constructor(props){
        super();
        this.state = { authenticated: false };
    }

    reupdate()
    {
        const pathname = this.browserHistory.location.pathname;
        
        const isAuthenticated = !!Meteor.userId();
        const isUnauthenticatedPage = this.unauthenticatedPages.includes(pathname);
        const isAuthenticatedPage = this.authenticatedPages.includes(pathname);
    
        if(this.state.authenticated != isAuthenticated)
        {
            this.forceUpdate();
            this.setState({
                authenticated: !!Meteor.userId()
            });
        }
    
        if(isUnauthenticatedPage)
        {
            onEnterPublicPage();
        }
        else onEnterPrivatePage();
        
    }


    ComponentDidMount(){
        Tracker.autorun(() => {
            
                const pathname = this.browserHistory.location.pathname;
                
                const isAuthenticated = !!Meteor.userId();
                const isUnauthenticatedPage = this.unauthenticatedPages.includes(pathname);
                const isAuthenticatedPage = this.authenticatedPages.includes(pathname);
            
                if(this.state.authenticated != isAuthenticated)
                {
                    this.forceUpdate();
                    this.setState({
                        authenticated: !!Meteor.userId()
                    });
                }
            
                if(isUnauthenticatedPage)
                {
                    onEnterPublicPage();
                }
                else onEnterPrivatePage();
                });
    }

    
    RenderHeader()
    {
        if(isAuthenticated)
        {
            return <Header history = {this.browserHistory} func = {this.reupdate.bind(this)}/>;
        }
        return null;
    }


    render(){
        
        if(!!Meteor.userId())
        return(
            <div>
                {this.RenderHeader()}
    
                    <Switch>
                        <Route exact path='/adventureboard' component={AdventureBoard}/>
                        <Route exact path='/binder' component={Binder}/>
                        <Route exact path='/campaigns' component={CampaignsPage}/>
                        <Route exact path='/campaigns/:_id' component={CampaignScreen}/>
                        <Route exact path='/campaign/edit/:_id' component={CampaignSetup}/>
                        <Route exact path='/characters' component={CharactersPage}/>
                        <Route exact path='/character/edit/:_id' component={CharacterSheet}/>
                        <Route exact path='/home' component={Home}/>
                        <Route exact path='/mail' component={Mail}/>
                        <Route exact path='/nearbyplayers' component={NearbyPlayers}/>
                        <Route exact path='/settings' component={Settings}/>
                        <Route exact path='/*' component={Home}/>
                        

                    </Switch>
                </div>
                
        )
        else{
            return(
                <div>
                    <Switch>

                        <Route exact path='/signin' component={Signin}/>
                        <Route exact path='/signup' component={Signup}/>
                        <Route exact path='/*' component={Signin}/>
                        
                    </Switch>
                </div>
            );  
        }
    }
}