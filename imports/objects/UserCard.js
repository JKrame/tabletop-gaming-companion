import React from 'react'
import { NavLink } from 'react-router-dom';

export default class UserCard extends React.Component{
    callParent(){
        if (this.props.func){
            this.props.func(this.props.param);
        }
    }
    render() {
        return (
            <div onClick={this.callParent.bind(this)} className='nav-item nav-link'>
                <div className="userCardMini highlight-container">
                    <div className="userCardMiniImage">
                        <img src={this.props.accountPicture !=null && this.props.accountPicture!="" ? this.props.accountPicture : '/images/photoMissing.png'} className="stretch-image" draggable="false"/>
                    </div>
                    <div className="userCardMiniInfo container-fluid">
                        <h4 className="no-margin-override h5-overflow-hidden verticalCenter">{this.props.username}</h4>
                    </div>
                </div>
            </div>
        );
    }
}