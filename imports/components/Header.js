import React from 'react'
import { NavLink } from 'react-router-dom'
import { Template } from 'meteor/templating'
import { Blaze } from 'meteor/blaze'
import {Accounts} from 'meteor/accounts-base';
//import logo from '../../images/logo.png';

// The Header creates links that can be used to navigate
// between routes.

var username;

export default class Header extends React.Component{

    logOut(){
        Meteor.logout();

        //this.state.isLoggedIn = !Meteor.userId();
        //this.forceUpdate();
    }

    componentWillMount(){
        this.headerTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('userData');
            if(sub.ready())
            {
                this.username = Meteor.users.findOne({_id : Meteor.userId()}).profile.username;
            }
   
            this.forceUpdate();
        });
    }

    componentWillUnmount(){
        this.headerTracker.stop();
    }

    render(){
        if(!!Meteor.userId())
        {
            return(
                <header className="navbar full-width">
                    <nav className="navbar-inner">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <NavLink to='/home' className='navbar-brand logo' style={{"marginTop":"-10px"}}><img className="full-width" src='images/primoHorizontal.png'/></NavLink>
                                <button className="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#collapsibleNavbarContent" aria-controls="collapsibleNavbarContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                            </div>     

                            <div className="collapse navbar-collapse pull-right" id="collapsibleNavbarContent" >
                                <ul className="nav navbar-nav mr-auto">
                                    <li >Welcome back {this.username}</li>
                                    <li ><NavLink to="/home">Home</NavLink></li>
                                    <li ><NavLink to="/adventureboard">Adventure Board</NavLink></li>
                                    <li ><NavLink to="/binder">Binder</NavLink></li>
                                    <li ><NavLink to="/mail">Mail</NavLink></li>
                                    <li ><NavLink to="/settings">Settings</NavLink></li>
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
