import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Signin from './Signin'
import Signup from './Signup'
import Home from './Home'

export default class Main extends React.Component{
    render(){
        return(
            <main>
                <div>
                    <Switch>
                        <Route exact path='/' component={Signin}/>
                        <Route exact path='/Signup' component={Signup}/>
                        <Route exact path='/Home' component={Home}/>
                    </Switch>
                </div>
            </main>
        );  
    }
}    