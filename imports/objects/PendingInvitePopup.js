import React from 'react'
import UserCardMini from '../objects/UserCard';
import CharacterCardHalf from '../objects/CharacterCardMini';

import { NavLink } from 'react-router-dom';


export default class PlayerFormPopup extends React.Component {

    constructor(){
        super();
        this.renderCharacterForm = this.renderCharacterForm.bind(this);

    }
    
    componentWillMount(){
        this.homeTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('characters');
            const sub2 = Meteor.subscribe('campaigns');
            var UID = Meteor.userId();
            if(sub.ready())
            {
                charactersArray = Characters.find({UID: UID}).fetch();
                //console.log(charactersArray)
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

    renderCharacterCard() {
        var cards = [];
        var UID = Meteor.userId();
        for (var i = 0; i < this.characters.length; i++)
        {   
            cards.push(
                <CharacterCardHalf 
                    key={i} 
                    parentPage={this} 
                    campaign={this.campaign} 
                    characterImageURL={this.characters[i].characterImageURL} 
                    id={this.characters[i]._id} 
                    somehistory={this.props.history} 
                    func={this.addCharacter.bind(this)} 
                    characterName={this.characters[i].characterName} 
                    characterClass={this.characters[i].characterClass} 
                    level={this.characters[i].level} 
                    race={this.characters[i].race}
                    character={this.characters[i]}/>
            );
        }
        return <div>{cards}</div>;
    }

    addCharacter(characterid , somehistory, campaign, character){
        console.log(characterid);
        console.log(campaign);
        Meteor.call("campaignCharacter.addToSet", 
            _id = campaign,
            character    
        );

        Meteor.call("characters.setCampaign", 
            characterid, 
            campaign
        );

        this.props.closePopup()
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

    render() {
        this.campaign=this.props.campaign

        return (
            <div className='popup'>
                <div className="pending-invite-popup popup_inner">
                    <div className="full-height full-width">
                        <h2>Select A Character</h2>
                        <div className="page-content-scroller">
                            {this.renderCharacterForm()}

                        </div>
                    </div>
                    <div className="right-align">
                        <button onClick={this.props.closePopup} className=" submit-button button">Cancel</button>
                    </div>
                    <div className="spacer col-sm-12"/>
                    <div className="spacer col-sm-12"/>

                </div>
            </div>
 
      );
    }
  }