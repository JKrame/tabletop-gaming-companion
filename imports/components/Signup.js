import React from 'react'
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base'

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

        if (password.length < 8) {
            return this.setState({error: 'Password must be more than 8 characters long'});
        }

        Accounts.createUser({email, password}, (err) => {
            if (err){
                this.setState({error: err.reason});
            } else {
                this.setState({error: ''});
            }
        });
    }

    render(){
        return(
            <div className="container">
                <div className="col-lg-8 col-lg-offset-2 main-content-panel verticalCenter">
                    <div>
                        <form className="form-signin" onSubmit={this.onSubmit.bind(this)} noValidate>
                            <h2 className="form-signin-heading">Please sign in</h2>
                            <label htmlFor="inputEmail" className="sr-only">Email address</label>
                            <input type="email" ref="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus/>
                            <label htmlFor="inputPassword" className="sr-only">Password</label>
                            <input type="password" ref="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                            <div className="checkbox">
                                <label>
                                <input type="checkbox" value="remember-me"/> Remember me
                                </label>
                            </div>
                            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                        </form>  
                    </div>
                </div>
            </div>
        );
    }
}  