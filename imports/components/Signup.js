import React from 'react'
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base'
import { NavLink } from 'react-router-dom'

export default class Signup extends React.Component{

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
        let username = this.refs.username.value.trim();

        if (password.length < 8) {
            return this.setState({error: 'Password must be more than 8 characters long'});
        }

        Accounts.createUser(
            {
                email, 
                password,
                profile : {
                    username,
                    accountPicture: null,
                    location: null,
                    schedule: [false, false, false, false, false, false, false],
                    friends:[],
                    pendingInvites:[]
                }

            }, 
            (err) => {
            if (err){
                this.setState({error: err.reason});
            } else {
                this.setState({error: ''});
                this.props.history.push('/home');
                this.forceUpdate();
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
                            <img src='images/primoLogo.png' className="col-sm-6 col-sm-offset-3" style={{"marginBottom":"20px"}}/>
                        </div>

                        {this.state.error ? <p>{this.state.error}</p> : undefined}
                        
                        <form className="form-signin col-sm-12" onSubmit={this.onSubmit.bind(this)} noValidate>
                            <label htmlFor="inputEmail" className="sr-only">Username</label>
                            <input type="Text" ref="username" id="inputUsername" className="form-control margin-5" placeholder="Username" required autoFocus style={{"width":"100%", "marginLeft":"0"}}/>
                            <label htmlFor="inputEmail" className="sr-only">Email address</label>
                            <input type="email" ref="email" id="inputEmail" className="form-control margin-5" placeholder="Email address" required autoFocus style={{"width":"100%", "marginLeft":"0"}}/>
                            <label htmlFor="inputPassword" className="sr-only">Password</label>
                            <input type="password" ref="password" id="inputPassword" className="form-control margin-5" placeholder="Password" required style={{"width":"100%", "marginLeft":"0"}}/>
                            <div className="checkbox" style={{"float":"left"}}>
                                <label>
                                    <input type="checkbox" value="remember-me"/> Remember me 
                                </label>
                            </div>
                            <div style={{"float":"right"}} className="margin-5">
                                <button type="submit" style={{"float":"right", "color": "#000000", "marginRight": "0px"}} className="margin-5 nav-item nav-link">Sign Up</button>
                                <NavLink to='/signin' className='nav-item nav-link'><button className="margin-5 cancel-button" style={{"float":"right", "color": "#000000"}}>Cancel</button></NavLink>
                            </div>
                        </form>  
                        <div style={{"height":"20px", "clear":"both"}}></div>
                    </div>
                </div>
            </div>
        );
    }
}  