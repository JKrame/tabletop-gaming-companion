import React from 'react'
import { NavLink } from 'react-router-dom'
import { Template } from 'meteor/templating'
import { Blaze } from 'meteor/blaze'
//import logo from '../../images/logo.png';

// The Header creates links that can be used to navigate
// between routes.
export default class Header extends React.Component{
    
    render(){
        if(!!Meteor.userId())
        {
            return(
                <header>
                    <nav className="navbar navbar-toggleable-md navbar-default">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <button className="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#collapsibleNavbarContent" aria-controls="collapsibleNavbarContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
        
                                <NavLink to='/' className='navbar-brand' style={{"margin-top":"-10px"}}><img src='images/primoHorizontal.png'/></NavLink>
                              
                            </div>                
                            <div className="collapse navbar-collapse pull-right" id="collapsibleNavbarContent" >
                                <ul className="nav navbar-nav mr-auto">
                                    <li ><a  href="#">Home</a></li>
                                    <li ><a  href="#">Adventure Board</a></li>
                                    <li ><a  href="#">Binder</a></li>
                                    <li ><a  href="#">Mail</a></li>
                                    <li ><a  href="#">Settings</a></li>
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
