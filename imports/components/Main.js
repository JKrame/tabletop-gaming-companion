import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Signin from './Signin'
import Signup from './Signup'
<<<<<<< HEAD
=======

>>>>>>> c8e34ce12c7c371651419dd6c047ec68c9149d9f

export default class Main extends React.Component{
    render(){
        return(
            <main>
                <div>
                    <Switch>
<<<<<<< HEAD
                        <Route exact path='/' component={Signup}/>
=======
                        <Route exact path='/' component={Signin}/>
                        <Route exact path='/Signup' component={Signup}/>
>>>>>>> c8e34ce12c7c371651419dd6c047ec68c9149d9f
                    </Switch>
                </div>
            </main>
        );  
    }
}    