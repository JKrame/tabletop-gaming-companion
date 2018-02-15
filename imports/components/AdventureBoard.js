import React from 'react'
import { NavLink } from 'react-router-dom';
import {Random} from 'meteor/random';

import CharacterCardHalf from '../objects/CharacterCardHalf';
import CampaignCardHalf from '../objects/CampaignCardHalf';


export default class AdventureBoard extends React.Component{
    componentWillMount(){
        this.adventureBoardTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('adventureBoard');
            if(sub.ready())
            {
                this.adventures = AdventureBoard.find({}).fetch();
                this.forceUpdate();               
            }
        });
    }

    componentWillUnmount(){
        this.adventureBoardTracker.stop();
    }

    renderCampaignCard() {
        var cards = [];

        for (var i = 0; i < this.adventures.length; i++)
        {
            cards.push(<CampaignCardHalf key={i} campaign={this.adventures[i]}/>);
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
                        <div className="scrolling-container-80">
                            {this.renderCampaignCard()}
                        </div>
                    </div>
                </div>
            </div>
    );
  }
}  