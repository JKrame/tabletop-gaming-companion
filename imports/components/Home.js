import React from 'react';
import { NavLink } from 'react-router-dom';
import { Random } from 'meteor/random';

//import { Characters } from '../api/character';
import CharacterCardHalf from '../objects/CharacterCardMini';
import CampaignCardHalf from '../objects/CampaignCardMini';

var characters;
var charactersArray;

var campaigns;
var campaignsArray;

export default class Home extends React.Component {

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
                campaignsArray = Campaigns.find({gm: UID}).fetch();
                if(campaignsArray != undefined)
                {
                    this.campaigns = campaignsArray;
                }
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
                <CharacterCardHalf key={i} characterImageURL={this.characters[i].characterImageURL} id={this.characters[i]._id} somehistory={this.props.history} func={this.loadCharacter} characterName={this.characters[i].characterName} characterClass={this.characters[i].characterClass} level={this.characters[i].level} race={this.characters[i].race}/>
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
                <CampaignCardHalf key={i} id={this.campaigns[i]._id} somehistory={this.props.history} func={this.loadCampaign} campaignName={this.campaigns[i].name} campaignDescription={this.campaigns[i].description}/>
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

    loadCampaign(campaignId, somehistory){
        if (!campaignId)
        {
            campaignId = Random.id();
            Meteor.call("campaigns.insert", campaignId);
        }

        if (!somehistory){
            somehistory = this.props.history;
        }

        somehistory.push('/campaign/edit/' + campaignId);
    }

    render() {
        Meteor.subscribe('characters');
        return(
        <div className="page-wrapper">
            <div className="col-lg-8 col-lg-offset-2">
                <div className="col-md-6 ">
                    <div className="page-content-half">
                        <NavLink to="Characters">
                            <h3>Characters >></h3>
                        </NavLink>
                        <hr/>
                        <div className="page-content-scroller">
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
                </div>
                    
                <div className="col-md-6 ">
                    <div className="page-content-half">
                        <NavLink to="Campaigns">
                            <h3>Campaign >></h3>
                        </NavLink>
                        <hr/>
                        
                        <div className="page-content-scroller">
                            {this.renderCampaignForm()}
                            
                            <div className="objectCardMini add-container">
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
                <div className="col-md-6 ">
                <div className="page-content-half">
                    <h3>Players Nearby >></h3>
                    <hr/>
                    <br/>
                    <div className="item"></div>
                    </div>
                </div>
                <div className="col-md-6 ">
                <div className="page-content-half">
                    <h3>Meeting Spots >></h3>
                    <hr/>
                    <br/>
                    <div className="item"></div>
                </div>
            </div>
            </div>
        </div>
        );
    }
}  
