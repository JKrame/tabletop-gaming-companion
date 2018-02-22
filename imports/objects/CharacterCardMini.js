import React from 'react'
import { NavLink } from 'react-router-dom';

export default class CharacterCardMini extends React.Component{
    render() {
        return (
            <NavLink to='#' onClick={() => this.props.func(this.props.id, this.props.somehistory)} className='nav-item nav-link'>
                <div className="objectCardMini highlight-container">
                    <div className="objectCardMiniImage">
                        <img src={this.props.characterImageURL!=null && this.props.characterImageURL!="" ? this.props.characterImageURL : '/images/photoMissing.png'} className="stretch-image"/>
                    </div>
                    <div className="objectCardMiniInfo container-fluid  col-xs-10">
                        <h5 className="no-margin-override h5-overflow-hidden">{this.props.characterName}</h5>
                        <hr className="hr-override-light"/>
                        <p className="p-override no-margin-override small-text"> Class: {this.props.characterClass}</p>
                        <p className="p-override no-margin-override small-text"> Level: {this.props.level}</p>
                    </div>
                </div>
            </NavLink>
        );
    }
}