import React from 'react'
import { NavLink } from 'react-router-dom';

export default class PlayerNearYou extends React.Component{
    render() {
        return (
            <div className='col-sm-12 player-near-you full-width'>
                <div className="online-indicator">

                </div>
                <h5 className="player-near-you-text">USERNAME1</h5>
            </div>
        );
    }
}