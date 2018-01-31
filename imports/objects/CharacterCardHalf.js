import React from 'react'
import { NavLink } from 'react-router-dom';

export default class CharacterCardHalf extends React.Component{
    render() {
        return (
            <div className="objectCardHalf highlight-container">
                <div className="objectCardHalfImage">
                    <img src={'/images/placeholder.jpg'} className="stretch-image"/>
                </div>
                <div className="objectCardHalfInfo container-fluid">
                    <h4 className="no-margin-override">{this.props.characterName}</h4>
                    <hr className="hr-override-light"/>
                    <p className="p-override no-margin-override"> Class: {this.props.characterClass}</p>
                    <p className="p-override no-margin-override"> Level: {this.props.level}</p>
                    <p className="p-override no-margin-override"> Race: {this.props.race}</p>
                </div>
            </div>
        );
    }
}