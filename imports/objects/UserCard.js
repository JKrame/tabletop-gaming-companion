import React from 'react'
import { NavLink } from 'react-router-dom';

export default class UserCard extends React.Component{
    callParent(){
        this.props.loadConversation(this.props.id);
    }
    render() {
        return (
            <div onClick={this.callParent.bind(this)} className='nav-item nav-link'>
                <div className="userCardMini highlight-container">
                    <div className="userCardMiniImage">
                        <img src={this.props.characterImageURL!=null && this.props.characterImageURL!="" ? this.props.characterImageURL : '/images/photoMissing.png'} className="stretch-image"/>
                    </div>
                    <div className="userCardMiniInfo container-fluid">
                        <h4 className="no-margin-override h5-overflow-hidden verticalCenter">USERNAME</h4>
                    </div>
                </div>
            </div>
        );
    }
}