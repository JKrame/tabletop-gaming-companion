import React from 'react';
import { NavLink } from 'react-router-dom';
import {Random} from 'meteor/random';

import { Characters } from '../api/character';
import CharacterCard from '../objects/CharacterCardMini';
import CampaignCard from '../objects/CampaignCardMini';

export default class Binder extends React.Component{
    renderCharacterCard() {
        //console.log(Meteor.userId());
        //console.log(Characters._collection._docs._map);
        myCharacters = Characters.find({_id : "qqL8fF2Yim2GeHTeo"}).fetch();
        console.log(myCharacters);
        //console.log(Characters.find().fetch());
        //console.log(myCharacters);

        var cards = [];
        var numcharacters = 5;
        for (var i = 0; i < numcharacters; i++)
        {
            cards.push(<CharacterCard key={i}/>);
        }
        return <div>{cards}</div>;
    }
    renderCampaignCard() {
        var cards = [];
        var numcampaigns = 2;
        for (var i = 0; i < numcampaigns; i++)
        {
            cards.push(<CampaignCard key={i}/>);
        }
        return <div>{cards}</div>;
    }
    loadCharacter(characterID){
        if (!characterID){
            console.log("randomizing");
            characterID = Random.id();
        }

        console.log(characterID);
        this.props.history.push('/character/edit/' + characterID);
    }
    loadCampaign(){
        this.props.history.push('/campaign/edit/');
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
                            <div className="scrolling-container">
                                {this.renderCharacterCard()}

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

                            <div className="scrolling-container">
                                {this.renderCampaignCard()}

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
                </div>
            </div>
        );
    }
}  