import React from 'react'
import { NavLink } from 'react-router-dom';

export default class UserCardMicro extends React.Component{
    insertFriend(){
            Meteor.call('conversations.insert', this.props.user, this.props.searchPlayer)
    }

    render() {
        return (
            <div className='nav-item nav-link'>
                <div className="userCardMini highlight-container">
                    <div className="userCardMiniImage">
                        <img src={this.props.userImageURL!=null && this.props.userImageURL!="" ? this.props.userImageURL : '/images/photoMissing.png'} className="stretch-image" draggable="false"/>
                    </div>
                    <div className="userCardMiniInfo container-fluid">
                        <h4 className="no-margin-override h5-overflow-hidden verticalCenter">{this.props.username}</h4>
                        </div>
                    </div>
                </div>
            );
        }
 
    }
