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

    logOut(){
        Meteor.logout();
        //this.state.isLoggedIn = !Meteor.userId();
        //this.forceUpdate();
    }

    componentWillMount(){
        this.headerTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('userData');
            const sub2 = Meteor.subscribe('conversations');
            if(sub.ready())
            {
                this.username = Meteor.users.findOne({_id : Meteor.userId()}).profile.username;
                this.url = Meteor.users.findOne({_id : Meteor.userId()}).profile.accountPicture;
                //console.log(this.username);
                //console.log(this.url);
                
                this.forceUpdate();
            }
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
                this.forceUpdate();
            }

        });
    }

    componentWillUnmount(){
        this.headerTracker.stop();
    }

    renderNotifyDot()
    {
        if(this.newMessages)
        {
            return <div className="notif-circle"/>;
        }
        else
        {
            return;
        }
    }

    render(){
        if(!!Meteor.userId())
        {
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
                                    <li ><NavLink to="/signin" onClick={this.logOut}>Log Out</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
            );
        }
        else{
            return(
                <header></header>
            );
        }
    }
}
