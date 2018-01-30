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
                    <h4 className="no-margin-override">Elfman Needsaname</h4>
                    <hr className="hr-override-light"/>
                    <p className="p-override no-margin-override"> Class: Druid</p>
                    <p className="p-override no-margin-override"> Level: 4</p>
                    <p className="p-override no-margin-override"> Race: Elf</p>
                </div>
            </div>
        );
    }
}