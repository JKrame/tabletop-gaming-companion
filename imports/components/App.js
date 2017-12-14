import React from 'react';
import Header from './Header';
import Main from './Main';
import { BrowserRouter } from 'react-router-dom';

export default class App extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <div>
                    <p>Test</p>
                <Header/>
                <Main/>
                </div>
            </BrowserRouter>
        );
    }
}    