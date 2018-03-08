import React from 'react'
import { NavLink } from 'react-router-dom';
import {Random} from 'meteor/random';

import CampaignCardHalf from '../objects/CampaignCardHalf';
import InvitePopup from '../objects/PendingInvitePopup';

import Header from './Header';

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
            const sub2 = Meteor.subscribe('characters');
            if(sub.ready())
            {
                this.adventures = Campaigns.find({isPublic : true}).fetch();
                this.forceUpdate();               
            }
            if(sub2.ready())
            {
                charactersArray = Characters.find({UID: Meteor.userId}).fetch();
                
                if(charactersArray != undefined)
                {
                    this.characterList = charactersArray;
                    this.forceUpdate();
                }
            }
        });
    }

    componentWillUnmount(){
        this.adventureBoardTracker.stop();
    }

    loadCampaign(campaignId, somehistory, campaigns){
        return;
    }

    contains(campaign, character){
        if (campaign.gm == Meteor.userId()){
            return false;
        }

        for(var i=0;i<campaign.characters.length;i++){
            for(var j=0;j<character.length;j++){
                if (campaign.characters[i]._id==character[j]._id){
                    if(character[j].UID == Meteor.userId()){
                        return false;
                    }
                }
            }
        }

        for(var i=0;i<campaign.pendingInvites.length;i++){
            for(var j=0;j<character.length;j++){
                if (campaign.pendingInvites[i]._id==character[j].UID){
                    return false;
                }
            }
        }

        return true;
    }

    renderCampaignCard() {
        
        if (!this.adventures){
            return;
        }
        if(!this.characterList){
            return;
        }
        var cards = [];

        for (var i = 0; i < this.adventures.length; i++)
        {
            if(this.contains(this.adventures[i], this.characterList)){
                cards.push(<CampaignCardHalf  key={i} func={this.toggleInvitePopup.bind(this)} key={i} campaignImageURL={this.adventures[i].campaignImageURL} id={this.adventures[i]._id} somehistory={this.props.history} campaigns={this.adventures} campaignName={this.adventures[i].name} campaignDescription={this.adventures[i].description}/>);
            }
        }

        return <div>{cards}</div>;
    }

  render() {
    return(
        <div className="page-wrapper">
            <Header/>
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