import React from 'react'
import { NavLink } from 'react-router-dom';

export default class UserNameCard extends React.Component{
    callParent(){
        if (this.props.func){
            this.props.func(this.props.param);
        }
    }
    render() {
        return (
            <div onClick={this.callParent.bind(this)} className='nav-item nav-link '>
                <div className="userCardMini highlight-container userNameCard" style={{"height":"30px"}}>
                    <h4 className="no-margin-override  verticalCenter" style={{"userSelect":"none"}}>{this.props.username}</h4>
                </div>
            </div>
        );
    }
}