import React from 'react';
import { NavLink } from 'react-router-dom';
import { Random } from 'meteor/random';
import geolib from 'geolib';
//import { Characters } from '../api/character';
import CharacterCardHalf from '../objects/CharacterCardMini';
import CampaignCardHalf from '../objects/CampaignCardMini';
import PendingCampaignCard from '../objects/PendingCampaignCard';
import PlayerNearYou from '../objects/PlayerNearYou';
import InvitePopup from '../objects/PendingInvitePopup';

import Header from './Header';

var characters;
var charactersArray;

var campaigns;
var campaignsArray;

var pendingInvites;
var username;

var pendingInviteCampaignID;

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            showInvitePopup: false
        };
    }

    toggleInvitePopup(campaignID) {
        this.setState({
            showInvitePopup: !this.state.showInvitePopup
        });
        this.pendingInviteCampaignID = campaignID;
        console.log(campaignID);
    }

    componentWillMount(){
        this.homeTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('characters');
            const sub2 = Meteor.subscribe('campaigns');
            var UID = Meteor.userId();
            if(sub.ready())
            {
                charactersArray = Characters.find({UID: UID}).fetch();
                if(charactersArray != undefined)
                {
                    this.characters = charactersArray;
                }
            }
            if(sub2.ready())
            {
                this.campaigns = Campaigns.find({gm: UID}).fetch();
                this.pendingInvites = Meteor.users.findOne({_id : Meteor.userId()}).profile.pendingInvites;
                this.otherCampaigns = Campaigns.find({"characters.UID": UID}).fetch();
            }
            this.forceUpdate();
        });
    }

    componentWillUnmount(){
        this.homeTracker.stop();
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
                <CharacterCardHalf
                    key={i}
                    characterImageURL={this.characters[i].characterImageURL}
                    id={this.characters[i]._id}
                    somehistory={this.props.history}
                    func={this.loadCharacter}
                    characterName={this.characters[i].characterName}
                    characterClass={this.characters[i].characterClass}
                    level={this.characters[i].level}
                    race={this.characters[i].race}
                />
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
                <CampaignCardHalf 
                    key={i} 
                    campaignImageURL={this.campaigns[i].campaignImageURL} 
                    id={this.campaigns[i]._id} 
                    somehistory={this.props.history} 
                    func={this.loadCampaign} 
                    campaigns={this.campaigns} 
                    campaignName={this.campaigns[i].name} 
                    campaignDescription={this.campaigns[i].description}
                />
            );
        }

        for (var i = 0; i < this.otherCampaigns.length; i++)
        {
            cards.push(
                <CampaignCardHalf 
                    key={i} 
                    campaignImageURL={this.otherCampaigns[i].campaignImageURL} 
                    id={this.otherCampaigns[i]._id} 
                    somehistory={this.props.history} 
                    func={this.loadCampaign} 
                    campaigns={this.otherCampaigns} 
                    campaignName={this.otherCampaigns[i].name} 
                    campaignDescription={this.otherCampaigns[i].description}
                />
            );
        }

        for (var i = 0; i < this.pendingInvites.length; i++)
        {
            console.log(this.pendingInvites[i][0]);
            cards.push(
                <div onClick={this.toggleInvitePopup.bind(this, this.pendingInvites[i][0])}>
                    <PendingCampaignCard
                        key={i}
                        campaignID={this.pendingInvites[i][0]}
                        campaignImageURL={this.pendingInvites[i][1]}
                        campaignName={this.pendingInvites[i][2]}
                    />
                </div>
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

    PlayersNearYou(){
        var cards = [];
        var currUserLocation=null
        if(!this.user){
            return;
        }  

        for(var i=0;i<this.user.length;i++){
            if(this.user[i]._id == Meteor.userId()){
                if(this.user[i].profile.location == null){
                    return;
                }
                currUserLocation=this.user[i].profile.location;
            }
        }

        for(var i=0;i<this.user.length;i++){
            if(this.user._id != Meteor.userId()){
                if(this.user[i].profile.location == null){
                    return;
                }
                userLocation=this.user[i].profile.location;
            }
            if(currUserLocation && userLocation != null)
            {
                distance = geolib.getDistance(
                    {latitude: currUserLocation[0], longitude: currUserLocation[1]},
                    {latitude: userLocation[0], longitude: userLocation[1]}
                );
                //30 miles
                if (distance<48280){
                    console.log("hit")
                    cards.push(
                        <PlayerNearYou
                            key={i}
                            somehistory={this.props.history}
                            username={this.user[i].profile.username}
                        />
                    );
                
                }
                return <div>{cards}</div>;
            }
        }
    }


    render() {
        Meteor.subscribe('characters');
        return(
        
        <div className="page-wrapper">
        <Header/>
            <div className="col-lg-8 col-lg-offset-2">
                <div className="col-lg-6 ">
                    <div className="page-content-half">
                        <NavLink to="Characters">
                            <h3>Characters >></h3>
                        </NavLink>
                    <hr className="hr-thicc"/>
                        <div className="page-content-scroller">
                            {this.renderCharacterForm()}
                            <NavLink to='#' onClick={() => this.loadCharacter()} className='nav-item nav-link'>   
                                <div className="objectCardMini add-container grow">
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
                </div>
                    
                <div className="col-lg-6 ">
                    <div className="page-content-half">
                        <NavLink to="Campaigns">
                            <h3>Campaign >></h3>
                        </NavLink>
                        <hr className="hr-thicc"/>
                        
                        <div className="page-content-scroller">
                            {this.renderCampaignForm()}
                               
                                <NavLink to='#' onClick={() => this.loadCampaign()} className='nav-item nav-link'>   
                                    <div className="objectCardMini add-container grow">
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
                <div className="col-lg-6 ">
                    <div className="page-content-half">
                        <NavLink to="nearbyplayers">
                            <h3>Players Nearby >></h3>
                        </NavLink>
                        <hr className="hr-thicc"/>
                        {this.PlayersNearYou()}
                        <div className="scrolling-container negate-vertical-margins">
                        </div>
                    </div>
                </div>
                    
                <div className="col-lg-6 ">
                    <div className="page-content-half">
                        <NavLink to="nearbyplayers">
                            <h3>Meeting Spots >></h3>
                        </NavLink>

                        <hr className="hr-thicc"/>
                        <iframe
                            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCqtGWum15tt9hxNTKPbpv98Sc184aWwCQ&q=Space+Needle,Seattle+WA" className="fill-width fill-height"
                            />
                    </div>
                </div>
            </div>
            {this.state.showInvitePopup ? 
                <InvitePopup
                    key={6666}
                    text='Close Me'
                    closePopup={this.toggleInvitePopup.bind(this)}
                    campaignID={this.pendingInviteCampaignID}
                />
                : null
            }
        </div>
        
        );
    }
}  
