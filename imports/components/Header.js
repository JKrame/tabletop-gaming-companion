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
        Accounts.logout();
    }

    render(){
        return(
            <header>
                <ul>
                <li><a>Home</a></li>
                <li><a>Adventure Board</a></li>
                <li><a>Binder</a></li>
                <li><a>Mail</a></li>
                <li><a>Settings</a></li>
                <button onClick={this.logOut}><li><a>Log Out</a></li></button>
                </ul>

                <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button className="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#collapsibleNavbarContent" aria-controls="collapsibleNavbarContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <NavLink to='/' className='navbar-brand'><img src='images/primoHorizontal.png'/></NavLink>
                        </div>                
                            
                        <div className="collapse navbar-collapse pull-right" id="collapsibleNavbarContent" >

                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}
