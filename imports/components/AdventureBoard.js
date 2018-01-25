import React from 'react'
import { NavLink } from 'react-router-dom';
import {Random} from 'meteor/random';

import CharacterCardHalf from '../objects/CharacterCardHalf';
import CampaignCardHalf from '../objects/CampaignCardHalf';


export default class AdventureBoard extends React.Component{
    renderCampaignCard() {
        var cards = [];
        var numcampaigns = 20;
        for (var i = 0; i < numcampaigns; i++)
        {
            cards.push(<CampaignCardHalf key={i}/>);
        }
        return <div>{cards}</div>;
    }
  render() {
    return(
        <div className="page-wrapper">
                <div className="col-lg-8 col-lg-offset-2">
                    <div className="page-content col-xs-12 fill-height" >
                        <NavLink to="Characters">
                                <h3>Public Adventure Board</h3>
                        </NavLink>
                        <hr/>
                        <div className="scrolling-container">
                            {this.renderCampaignCard()}
                        </div>
                    </div>
                </div>
            </div>
    );
  }
}  