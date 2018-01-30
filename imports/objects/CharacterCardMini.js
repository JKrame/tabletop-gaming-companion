import React from 'react'
import { NavLink } from 'react-router-dom';

export default class CharacterCardMini extends React.Component{
    render() {
        return (
            <div className="objectCardMini highlight-container">
                <div className="objectCardMiniImage">
                    <img src={'/images/placeholder.jpg'} className="stretch-image"/>
                </div>
                <div className="objectCardMiniInfo container-fluid">
                    <h5 className="no-margin-override h5-overflow-hidden">Elfman Needsaname</h5>
                    <hr className="hr-override-light"/>
                    <p className="p-override no-margin-override small-text"> Class: Druid</p>
                    <p className="p-override no-margin-override small-text"> Level: 4</p>
                </div>
            </div>
        );
    }
}