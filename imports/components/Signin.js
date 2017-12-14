import React from 'react'
import { NavLink } from 'react-router-dom'

export default class Signin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: ''
        };
    }

    onSubmit(e){
        e.preventDefault();

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        Meteor.loginWithPassword({email}, password, (err) => {
            if (err) {
              this.setState({error: 'Unable to login. Check email and password.'});
            } else {
              this.setState({error: ''});
            }
          });
    }

    render(){
        return(
            <div className="container">
                <div className="col-lg-4 main-content-panel verticalCenter">
                    <div>
                    <div style={{"height":"15px"}}></div>
                        <div className="col-sm-12" >
                            <img src='images/primoLogo.png' className="col-sm-6 col-sm-offset-3" style={{"margin-bottom":"20px"}}/>
                        </div>
                        <form className="form-signin col-sm-12">
                            <label htmlFor="inputEmail" className="sr-only">Email address</label>
                            <input type="email" ref="email" id="inputEmail" className="form-control margin-5" placeholder="Email address" required autoFocus style={{"width":"100%", "margin-left":"0"}}/>
                            <label htmlFor="inputPassword" className="sr-only">Password</label>
                            <input type="password" ref="password" id="inputPassword" className="form-control margin-5" placeholder="Password" required style={{"width":"100%", "margin-left":"0"}}/>
                            <div className="checkbox" style={{"float":"left"}}>
                                <label>
                                <input type="checkbox" value="remember-me"/> Remember me
                                </label>
                            </div>
                            <div style={{"float":"right"}} className="margin-5">
                                <button type="submit" style={{"float":"right", "color": "#000000", "margin-right": "0px"}} className="margin-5 nav-item nav-link">Sign In</button>
                                <NavLink to='/Signup' className='nav-item nav-link'><button className="margin-5" style={{"float":"right", "color": "#000000"}}>Signup</button></NavLink>
                            </div>
                        </form> 

                        <div style={{"height":"20px", "clear":"both"}}></div>

                    </div>
                </div>
            </div>
        );
    }
}  