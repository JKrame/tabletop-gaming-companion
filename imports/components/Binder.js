import React from 'react';
import { NavLink } from 'react-router-dom';
import {Random} from 'meteor/random';

import { Characters } from '../api/character';

import CharacterCardHalf from '../objects/CharacterCardHalf';
import CampaignCardHalf from '../objects/CampaignCardHalf';

export default class Binder extends React.Component{
    renderCharacterCard() {
        //console.log(Meteor.userId());
        //console.log(Characters._collection._docs._map);
        myCharacters = Characters.find({_id : "qqL8fF2Yim2GeHTeo"}).fetch();
        console.log(myCharacters);
        //console.log(Characters.find().fetch());
        //console.log(myCharacters);

        var cards = [];
        var numcharacters = 4;
        for (var i = 0; i < numcharacters; i++)
        {
            cards.push(<CharacterCardHalf key={i}/>);
        }
        return <div>{cards}</div>;
    }
    renderCampaignCard() {
        var cards = [];
        var numcampaigns = 2;
        for (var i = 0; i < numcampaigns; i++)
        {
            cards.push(<CampaignCardHalf key={i}/>);
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
                                <div className="objectCardHalf ">
                                    <div className="objectCardHalfImage">
                                        <img src={'/images/addIcon.png'} className="stretch-image"/>
                                    </div>
                                    <div className="objectCardHalfInfo container-fluid">
                                        <h4>CREATE NEW CHARACTER</h4>
                                        <hr className="hr-override-light"/>
                                    </div>
                                </div>
                                </NavLink>
                            </div>
                        </div>

                        <div className="col-lg-6 split-page-right">
                            <h3>Your Campaigns >></h3>
                            <hr className="container-fluid"/>

                            <div className="scrolling-container">
                                {this.renderCampaignCard()}
                                <div className="objectCardHalf ">
                                    <div className="objectCardHalfImage">
                                        <img src={'/images/pending.png'} className="stretch-image"/>
                                    </div>
                                    <div className="objectCardHalfInfo container-fluid">
                                        <h4>PENDING INVITE</h4>
                                        <hr className="hr-override-light"/>
                                        <p className="p-override">Click for Details...</p>
                                    </div>
                                </div>

                                <div className="objectCardHalf ">
                                    <div className="objectCardHalfImage">
                                        <img src={'/images/addIcon.png'} className="stretch-image"/>
                                    </div>
                                    <div className="objectCardHalfInfo container-fluid">
                                        <h4>CREATE NEW CAMPAIGN</h4>
                                        <hr className="hr-override-light"/>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}  