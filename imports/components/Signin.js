import React from 'react'
import { NavLink } from 'react-router-dom'

export default class Signin extends React.Component{
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
                        </form>  
                        <button className="btn btn-lg btn-primary btn-block"><NavLink to='/Signup' className='nav-item nav-link nav-font-styles' style={{"fontSize":"20"}}>Signup</NavLink></button>
                        
                    </div>
                </div>
            </div>
        );
    }
}  