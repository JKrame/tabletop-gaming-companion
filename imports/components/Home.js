import React from 'react';
import { NavLink } from 'react-router-dom';

import { Characters } from '../api/character';
import CharacterCardHalf from '../objects/CharacterCardMini';
import CampaignCardHalf from '../objects/CampaignCardMini';


export default class Home extends React.Component {
    onSubmit(e) {
        console.log("onsubmit");
        //gets the character name
        const characterName = this.refs.characterName.value.trim();
        e.preventDefault();

        //checks if value exists
        if (characterName) {
        Characters.insert({ characterName });
        this.refs.characterName.value = '';
        }
    }

    renderCharacterCard() {
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
                <div className="col-md-6 ">
                    <div className="page-content-half">
                        <NavLink to="Characters">
                            <h3>Characters >></h3>
                        </NavLink>
                        <hr/>
                        <div className="page-content-scroller">
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
                </div>
                    
                <div className="col-md-6 ">
                    <div className="page-content-half">
                        <NavLink to="Campaigns">
                            <h3>Campaign >></h3>
                        </NavLink>
                        <hr/>
                        
                        <div className="page-content-scroller">
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
