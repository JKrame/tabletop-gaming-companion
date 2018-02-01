import React from 'react';
import { NavLink } from 'react-router-dom';

export default class CharacterCardVertical extends React.Component {
    render() {
        return (
            <div className="vertical-card col-lg-3 col-md-4 col-sm-6 col-xs-12 highlight-container">
                <div className="vertical-card-contents">
                    <div className="vertical-image">
                        <img src={'/images/photoMissing.png'} className="full-width vertical-image"/>
                    </div>
                    <div className="vertical-data">
                        <h3>{this.props.characterName}</h3>
                        <hr className="hr-override-light"/>
                        <p className="p-override"> Class: {this.props.characterClass}</p>
                        <p className="p-override"> Level: {this.props.level}</p>
                        <p className="p-override"> Race: {this.props.race}</p>
                    </div>
                </div>
            </div>
        );
    }
}