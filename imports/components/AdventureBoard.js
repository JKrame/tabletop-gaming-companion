import React from 'react'
import { NavLink } from 'react-router-dom';
import {Random} from 'meteor/random';

import CampaignCardHalf from '../objects/CampaignCardHalf';


export default class AdventureBoard extends React.Component{
    componentWillMount(){
        this.adventureBoardTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('campaigns');
            if(sub.ready())
            {
                this.adventures = Campaigns.find({isPublic : true}).fetch();
                this.forceUpdate();               
            }
        });
    }

    componentWillUnmount(){
        this.adventureBoardTracker.stop();
    }

    loadCampaign(campaignId, somehistory, campaigns){
        if (!campaignId)
        {
            campaignId = Random.id();
            Meteor.call("campaigns.insert", campaignId);
        }

        if (!somehistory){ 
            somehistory = this.props.history;
            somehistory.push('/campaign/edit/' + campaignId);
        }
        else
        {
            for(var i = 0; i < campaigns.length; i++)
            {
                if(campaigns[i]._id == campaignId)
                {
                    if(campaigns[i].gm == Meteor.userId())
                    {
                        somehistory.push('/campaign/edit/' + campaignId); //first send them to the editing page
                    }
                    else
                    {
                        somehistory.push('/campaigns/' + campaignId); //if they dont own it, send them to game screen
                    }
                    break;
                }
            }
        }
    }

    renderCampaignCard() {
        if (!this.adventures){
            return;
        }
        console.log(this.adventures);
        var cards = [];

        for (var i = 0; i < this.adventures.length; i++)
        {
            cards.push(<CampaignCardHalf key={i} campaignImageURL={this.adventures[i].campaignImageURL} id={this.adventures[i]._id} somehistory={this.props.history} func={this.loadCampaign} campaigns={this.adventures} campaignName={this.adventures[i].name} campaignDescription={this.adventures[i].description}/>);
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