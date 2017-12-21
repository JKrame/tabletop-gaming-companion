import React from 'react'
import { NavLink } from 'react-router-dom'
import { Template } from 'meteor/templating'
import { Blaze } from 'meteor/blaze'
import {Accounts} from 'meteor/accounts-base';
//import logo from '../../images/logo.png';

// The Header creates links that can be used to navigate
// between routes.
export default class Header extends React.Component{

    logOut(){
        Meteor.logout();
    }

    render(){
        if(!!Meteor.userId())
        {
            return(
                <header className="navbar">
                    <nav className="navbar-inner">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <button className="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#collapsibleNavbarContent" aria-controls="collapsibleNavbarContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
        
                                <NavLink to='/' className='navbar-brand' style={{"marginTop":"-10px"}}><img src='images/primoHorizontal.png'/></NavLink>
                              
                            </div>                
                            <div className="collapse navbar-collapse pull-right" id="collapsibleNavbarContent" >
                                <ul className="nav navbar-nav mr-auto">
                                    <li ><NavLink to="/home">Home</NavLink></li>
                                    <li ><NavLink to="/adventureboard">Adventure Board</NavLink></li>
                                    <li ><NavLink to="/binder">Binder</NavLink></li>
                                    <li ><NavLink to="/mail">Mail</NavLink></li>
                                    <li ><NavLink to="/settings">Settings</NavLink></li>
                                    <li ><a onClick={this.logOut}>Log Out</a></li>
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
