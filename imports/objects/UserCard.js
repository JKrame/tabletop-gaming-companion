import React from 'react'
import { NavLink } from 'react-router-dom';

export default class UserCard extends React.Component{
    render() {
        return (
            <NavLink to='#' className='nav-item nav-link'>
                <div className="userCardMini highlight-container">
                    <div className="userCardMiniImage">
                        <img src={this.props.characterImageURL!=null && this.props.characterImageURL!="" ? this.props.characterImageURL : '/images/photoMissing.png'} className="stretch-image"/>
                    </div>
                    <div className="userCardMiniInfo container-fluid">
                        <h4 className="no-margin-override h5-overflow-hidden verticalCenter">USERNAME</h4>
                    </div>
                </div>
            </NavLink>
        );
    }
}