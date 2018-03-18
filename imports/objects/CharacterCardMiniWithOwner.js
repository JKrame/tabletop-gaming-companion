import React from 'react'
import { NavLink } from 'react-router-dom';

export default class CharacterCardMiniWithOwner extends React.Component{
    render() {
        var username = Meteor.users.findOne({_id: this.props.character.UID}).profile.username;
        return (
            <NavLink to='#' className='nav-item nav-link'>
                <div className="objectCardMini highlight-container">
                    <div className="objectCardMiniImage">
                        <img src={this.props.character.characterImageURL!=null && this.props.character.characterImageURL!="" ? this.props.character.characterImageURL : '/images/photoMissing.png'} className="stretch-image"/>
                    </div>
                    <div className="objectCardMiniInfo container-fluid">
                        <h5 className="no-margin-override h5-overflow-hidden">{this.props.character.characterName}</h5>
                        <hr className="hr-override-light"/>
                        <p className="p-override no-margin-override small-text"> Class: {this.props.character.characterClass}</p>
                        <p className="p-override no-margin-override small-text"> Level: {this.props.character.level}</p>
                        <p className="p-override no-margin-override small-text"> Owner: {username}</p>
                    </div>
                </div>
            </NavLink>
        );
    }
}