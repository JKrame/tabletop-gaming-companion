import React from 'react';
import { NavLink } from 'react-router-dom';
import {Random} from 'meteor/random';

//import { Characters } from '../api/character';
import CharacterCard from '../objects/CharacterCardMini';
import CampaignCard from '../objects/CampaignCardMini';
import InvitePopup from '../objects/PendingInvitePopup';


var characters;
var charactersArray;

var campaigns;
var campaignsArray;

export default class Binder extends React.Component{
    constructor() {
        super();
        this.state = {
            showInvitePopup: false
        };
    }

    toggleInvitePopup() {
        this.setState({
            showInvitePopup: !this.state.showInvitePopup
        });
    }

    componentWillMount(){
        this.binderTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('characters');
            const sub2 = Meteor.subscribe('campaigns');
            var UID = Meteor.userId();
            if(sub.ready())
            {
                charactersArray = Characters.find({UID: UID}).fetch();
                if(charactersArray != undefined)
                {
                    this.characters = charactersArray;
                    display = true;
                }
            }
            if(sub2.ready())
            {
                campaignsArray = Campaigns.find({gm: UID}).fetch();
                if(campaignsArray != undefined)
                {
                    this.campaigns = campaignsArray;
                    display = true;
                }
            }
            this.forceUpdate();
        });
    }

    componentWillUnmount(){
        this.binderTracker.stop();
    }

    renderCharacterForm(){
        if(this.characters == undefined)
        {
            return;
        }
        else
        {
            return this.renderCharacterCard();
        }
    }

    renderCampaignForm(){
        if(this.campaigns == undefined)
        {
            return;
        }
        else
        {
            return this.renderCampaignCard();
        }
    }

    renderCharacterCard() {
        var cards = [];
        var UID = Meteor.userId();
        for (var i = 0; i < this.characters.length; i++)
        {   
            cards.push(
                <CharacterCard key={i} characterImageURL={this.characters[i].characterImageURL} id={this.characters[i]._id} somehistory={this.props.history} func={this.loadCharacter} characterName={this.characters[i].characterName} characterClass={this.characters[i].characterClass} level={this.characters[i].level} race={this.characters[i].race}/>
            );
        }
        return <div>{cards}</div>;
    }

    renderCampaignCard() {
        var cards = [];
        var UID = Meteor.userId();
        for (var i = 0; i < this.campaigns.length; i++)
        {
            cards.push(
                <CampaignCard key={i} campaignImageURL={this.campaigns[i].campaignImageURL} id={this.campaigns[i]._id} somehistory={this.props.history} func={this.loadCampaign} campaigns={this.campaigns} campaignName={this.campaigns[i].name} campaignDescription={this.campaigns[i].description}/>
            );
        }
        return <div>{cards}</div>;
    }

    loadCharacter(cid, somehistory){
        if (!cid)
        {
            cid = Random.id();
            Meteor.call('characters.insert', cid);
        }

        if (!somehistory){
            somehistory = this.props.history;
        }

        somehistory.push('/character/edit/' + cid);
    }

    loadCampaign(campaignId, somehistory, campaigns){
        if (!campaignId)
        {
            campaignId = Random.id();
            Meteor.call("campaigns.insert",  campaignId);
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

    render() {
        return(
            <div className="page-wrapper">
                <div className="col-lg-8 col-lg-offset-2">
                    <div className="page-content col-xs-12 fill-height" >
                        <div className="col-lg-6 split-page-left">
                            <NavLink to="Characters">
                                    <h3>Your Characters >></h3>
                            </NavLink>
                            <hr/>
                            <div className="scrolling-container-80">
                                {this.renderCharacterForm()}

                                <NavLink to='#' onClick={() => this.loadCharacter()} className='nav-item nav-link'>   
                                    <div className="objectCardMini add-container">
                                        <div className="objectCardMiniImage">
                                            <img src={'/images/addIcon.png'} className="stretch-image"/>
                                        </div>
                                        <div className="objectCardMiniInfo container-fluid">
                                            <h4 className="no-margin-override">CREATE NEW CHARACTER</h4>
                                            <hr className="hr-override-light"/>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        </div>

                        <div className="col-lg-6 split-page-right">
                            <NavLink to="Campaigns">
                                <h3>Your Campaigns >></h3>
                            </NavLink>
                            <hr className="container-fluid"/>

                            <div className="scrolling-container-80">
                                {this.renderCampaignForm()}

                                <div className="objectCardMini add-container" onClick={this.toggleInvitePopup.bind(this)}>
                                        <div className="objectCardMiniImage">
                                            <img src={'/images/pending.png'} className="stretch-image"/>
                                        </div>
                                        <div className="objectCardMiniInfo container-fluid">
                                            <h4 className="no-margin-override">PENDING INVITE</h4>
                                            <hr className="hr-override-light"/>
                                            <p className="p-override">Click for Details...</p>
                                        </div>
                                    </div>
                               
                                <NavLink to='#' onClick={() => this.loadCampaign()} className='nav-item nav-link'>   
                                    <div className="objectCardMini add-container">
                                        <div className="objectCardMiniImage">
                                            <img src={'/images/addIcon.png'} className="stretch-image"/>
                                        </div>
                                        <div className="objectCardMiniInfo container-fluid">
                                            <h4 className="no-margin-override">CREATE NEW CAMPAIGN</h4>
                                            <hr className="hr-override-light"/>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.showInvitePopup ? 
                    <InvitePopup
                        text='Close Me'
                        closePopup={this.toggleInvitePopup.bind(this)}
                    />
                    : null
                }
            </div>
        );
    }
}  