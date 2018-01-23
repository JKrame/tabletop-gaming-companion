import React from 'react';
import { NavLink } from 'react-router-dom';

import { Characters } from '../api/character';
import CharacterCardHalf from '../objects/CharacterCardHalf';
import CampaignCardHalf from '../objects/CampaignCardHalf';


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
            cards.push(<CharacterCardHalf/>);
        }
        return <div>{cards}</div>;
    }

    renderCampaignCard() {
        var cards = [];
        var numcampaigns = 2;
        for (var i = 0; i < numcampaigns; i++)
        {
            cards.push(<CampaignCardHalf/>);
        }
        return <div>{cards}</div>;
    }

    loadCharacter(characterID){
        if (!characterID){
            console.log("randomizing");
            characterID = Random.id();
        }

        console.log(characterID);
        window.location.assign('/character/edit/' + characterID);
    }

    render() {
        return(
        <div className="page-wrapper">
            <div className="col-lg-8 col-lg-offset-2">
                    <div className="col-md-6 ">
<<<<<<< HEAD
                        <div className="page-content-half">
                            <h3>Characters >></h3>
                            <hr/>
                            <div className="page-content-scroller">
                                <div className="objectCardHalf ">
                                    <div className="objectCardHalfImage">
                                        <img src={'/images/placeholder.jpg'}/>
                                    </div>
                                    <div className="objectCardHalfInfo container-fluid">
                                        <h4>Elfman Needsaname</h4>
                                        <hr className="hr-override container-fluid"/>
                                        <p className="p-override">Class: Druid</p>
                                        <p className="p-override">Level: 4</p>
                                        <p className="p-override">Race: Elf</p>
                                    </div>
                                </div>
                                <div className="objectCardHalf ">
                                    <div className="objectCardHalfImage">
                                        <img src={'/images/placeholder.jpg'}/>
                                    </div>
                                    <div className="objectCardHalfInfo container-fluid">
                                        <h4>Elfman Needsaname</h4>
                                        <hr className="hr-override container-fluid"/>
                                        <p className="p-override">Class: Druid</p>
                                        <p className="p-override">Level: 4</p>
                                        <p className="p-override">Race: Elf</p>
                                    </div>
                                </div>
                                <div className="objectCardHalf ">
                                    <div className="objectCardHalfImage">
                                        <img src={'/images/placeholder.jpg'}/>
                                    </div>
                                    <div className="objectCardHalfInfo container-fluid">
                                        <h4>Elfman Needsaname</h4>
                                        <hr className="hr-override container-fluid"/>
                                        <p className="p-override">Class: Druid</p>
                                        <p className="p-override">Level: 4</p>
                                        <p className="p-override">Race: Elf</p>
                                    </div>
                                </div>

                                <NavLink to='#1' onClick={() => this.loadCharacter("ElfMan")} className='nav-item nav-link'>
                                    <div className="objectCardHalf ">
                                        <div className="objectCardHalfImage">
                                            <img src={'/images/placeholder.jpg'}/>
                                        </div>
                                        <div className="objectCardHalfInfo container-fluid">
                                            <h4>Elfman Needsaname</h4>
                                            <hr className="hr-override container-fluid"/>
                                            <p className="p-override">Class: Druid</p>
                                            <p className="p-override">Level: 4</p>
                                            <p className="p-override">Race: Elf</p>
                                        </div>
                                    </div>
                                </NavLink>

                                <NavLink to='#' onClick={() => this.loadCharacter()} className='nav-item nav-link'>
=======

                    <div className="page-content-half">
                        <h3>Characters >></h3>
                        <hr/>
                            <div className="page-content-scroller">
                            {this.renderCharacterCard()}
                                <NavLink to='/character/edit/' className='nav-item nav-link'>              
>>>>>>> 1d8c685599ae7835742e9bb2e9d60516d55445dd
                                    <div className="objectCardHalf ">
                                        <div className="objectCardHalfImage">
                                            <img src={'/images/addIcon.png'}/>
                                        </div>
                                        <div className="objectCardHalfInfo container-fluid">
                                            <h4>CREATE NEW CHARACTER</h4>
                                            <hr className="hr-override container-fluid"/>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    
                <div className="col-md-6 ">
                    <div className="page-content-half">
                        <h3>Campaigns >></h3>
                        <hr/>
                        
                        <div className="page-content-scroller">
                            {this.renderCampaignCard()}
                            <div className="objectCardHalf ">
                                <div className="objectCardHalfImage">
                                    <img src={'/images/pending.png'}/>
                                </div>
                                <div className="objectCardHalfInfo container-fluid">
                                    <h4>PENDING INVITE</h4>
                                    <hr className="hr-override container-fluid"/>
                                    <p className="p-override">Click for Details...</p>
                                </div>
                            </div>

                            <NavLink to='/campaign/edit/' className='nav-item nav-link'>                                          
                                <div className="objectCardHalf ">
                                        <div className="objectCardHalfImage">
                                            <img src={'/images/addIcon.png'}/>
                                        </div>
                                    <div className="objectCardHalfInfo container-fluid">
                                        <h4>CREATE NEW CAMPAIGN</h4>
                                        <hr className="hr-override container-fluid"/>
                                        <p className="p-override">Campaign Description...</p>
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
