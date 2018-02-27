import React from 'react'
import { NavLink } from 'react-router-dom';
import {Random} from 'meteor/random';

import CampaignCardHalf from '../objects/CampaignCardHalf';
import InvitePopup from '../objects/PendingInvitePopup';

export default class AdventureBoard extends React.Component{
    constructor() {
        super();
        this.state = {
            showInvitePopup: false,
            campaignID:null
        };
    }

    toggleInvitePopup(id) {
        this.setState({
            showInvitePopup: !this.state.showInvitePopup,
            campaignID:id
        });
    }

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
        return;
    }

    contains(array, value){

        for(var i=0;i<array.length;i++){
            if (value == array[i]){
                return false;
            }
        }
        return true;
    }

    renderCampaignCard() {
        if (!this.adventures){
            return;
        }
        //console.log(this.adventures);
        var cards = [];

        for (var i = 0; i < this.adventures.length; i++)
        {

            if(this.contains(this.adventures[i].players, Meteor.userId()))
                cards.push(<CampaignCardHalf  key={i} func={this.toggleInvitePopup.bind(this)} key={i} campaignImageURL={this.adventures[i].campaignImageURL} id={this.adventures[i]._id} somehistory={this.props.history} campaigns={this.adventures} campaignName={this.adventures[i].name} campaignDescription={this.adventures[i].description}/>);
        }

        return <div>{cards}</div>;
    }

  render() {
    return(
        <div className="page-wrapper">
                <div className="col-lg-8 col-lg-offset-2">
                    <div className="page-content col-xs-12 fill-height" >

                        <h3>Public Adventure Board</h3>

                        <hr/>
                        <div className="scrolling-container-80">
                            {this.renderCampaignCard()}
                        </div>
                    </div>
                </div>
                {this.state.showInvitePopup ? 
                <InvitePopup
                    text='Close Me'
                    closePopup={this.toggleInvitePopup.bind(this)}
                    campaign={this.state.campaignID}
                />
                : null
            }
            </div>
    );
  }
}  