import React from 'react'
import { NavLink } from 'react-router-dom'
import { Template } from 'meteor/templating'
import { Blaze } from 'meteor/blaze'
import {Accounts} from 'meteor/accounts-base';
//import logo from '../../images/logo.png';

// The Header creates links that can be used to navigate
// between routes.

var username;
var url;
var conversations;
var newMessages;


export default class Header extends React.Component{
    constructor(props){
        super(props);
    }

    logOut(){
        this.loggedOut = true;
        Meteor.logout();
        this.props.history.push('/signin');
        //this.forceUpdate();
    }

    componentWillMount(){
        this.loggedOut = false;
        
        this.headerTracker = Tracker.autorun(() => {
            if (this.loggedOut){
                return;
            }

            const sub = Meteor.subscribe('userData');
            if(sub.ready())
            {
                this.user = Meteor.user();
                if (this.user){
                    this.username = this.user.profile.username;
                    this.url = this.user.profile.accountPicture;
                }
            }

            const sub2 = Meteor.subscribe('conversations');
            if(sub2.ready())
            {
                this.conversations = Conversations.find({}).fetch();
                this.newMessages = false;
                for (var i = 0; i < this.conversations.length; i++)
                {
                    if (this.conversations[i].participants[0].id == Meteor.userId() && this.conversations[i].userOneUnread == true)
                    {
                        this.newMessages = true;
                        break;
                    }
                    else if (this.conversations[i].participants[1].id == Meteor.userId() && this.conversations[i].userTwoUnread == true)
                    {
                        this.newMessages = true;
                        break;
                    }
                }
            }

            this.forceUpdate();
        });
    }

    componentWillUnmount(){
        this.headerTracker.stop();
    }

    renderNotifyDot(){
        if(this.newMessages) {
            return <div className="notif-circle"/>;
        }
        else {
            return;
        }
    }

    render(){
        if(Meteor.userId() != null && !this.loggedOut) {
            return(
                <header className="navbar full-width">
                    <nav className="navbar-inner">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <NavLink to='/home' className='navbar-brand logo' style={{"marginTop":"-10px"}}><img className="full-width" src='images/primoHorizontal.png' className="logo"/></NavLink>
                                <button className="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#collapsibleNavbarContent" aria-controls="collapsibleNavbarContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                            </div>     

                            <div className="collapse navbar-collapse pull-right" id="collapsibleNavbarContent" >
                                <ul className="nav navbar-nav mr-auto">
                                    <li ><NavLink to="/home">Home</NavLink></li>
                                    <li ><NavLink to="/adventureboard">Adventure Board</NavLink></li>
                                    <li ><NavLink to="/binder">Binder</NavLink></li>
                                    <li ><NavLink to="/mail">Mail {this.renderNotifyDot()}</NavLink></li>
                                    <li ><NavLink to="/settings"><div><img src={this.url != null && this.url != "" ? this.url : '/images/photoMissing.png'} style={{"maxWidth":"50px","maxHeight":"20px", "padding":"0px"}}/>    <strong>{this.username}</strong></div></NavLink></li>
                                    <li ><NavLink to="/signin" onClick={this.logOut.bind(this)}>Log Out</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
            );
        }
        else{
            return null;
        }
    }
}
