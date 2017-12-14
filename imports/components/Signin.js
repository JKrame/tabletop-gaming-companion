import React from 'react'

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
                <div className="col-lg-8 col-lg-offset-2 main-content-panel verticalCenter">
                    <div>
                        <form className="form-signin">
                            <h2 className="form-signin-heading">Please sign in</h2>
                            <label htmlFor="inputEmail" className="sr-only">Email address</label>
                            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus/>
                            <label htmlFor="inputPassword" className="sr-only">Password</label>
                            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                            <div className="checkbox">
                                <label>
                                <input type="checkbox" value="remember-me"/> Remember me
                                </label>
                            </div>
                            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign In</button>
                            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
                        </form>  
                    </div>
                </div>
            </div>
        );
    }
}  