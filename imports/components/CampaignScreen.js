import React from 'react';
import { NavLink } from 'react-router-dom';
import {Random} from 'meteor/random';
import ToggleButton from 'react-toggle-button'

import { Characters } from '../api/character';
import CharacterCard from '../objects/CharacterCardMini';
import CampaignCard from '../objects/CampaignCardMini';

export default class CampaignScreen extends React.Component{
    renderCharacterCard() {
        //console.log(Meteor.userId());
        //console.log(Characters._collection._docs._map);
        //myCharacters = Characters.find({_id : "qqL8fF2Yim2GeHTeo"}).fetch();
        //console.log(myCharacters);
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

    toggleButton_Click(event){
        var clicked = event.target;
        clicked.backgroundColor = red;
    }

    render() {
        return(
            <div className="page-wrapper">
                <div className="col-md-12">
                    <div className=" game-screen">

                            <div className="sub-content-top">
                                <div className="col-md-3 col-xs-12 content-container-left">
                                        <div className="spacer col-sm-12"/>

                                        <h3>Initiative</h3>
                                        <hr/>
                                        <div className="scrolling-container-content-top">
                                            {this.renderCharacterCard()}
                                        </div>

                         
                                        
                                        <div className="col-sm-12">
                                            <button className="full-width submit-button ">END TURN</button>
                                        </div>
                                </div>

                                <div className="col-md-6 col-xs-12 content-container-mid add-background" >
                                    
                                </div>

                                <div className="col-md-3 col-xs-12 content-container-right">
                                    <div className="spacer col-sm-12"/>
                                    <h3>Characters</h3>
                                    <hr/>
                                    <div className="scrolling-container">
                                        {this.renderCharacterCard()}
                                    </div>
                                </div>
                            </div>

                            <div className="sub-content-bottom">

                                <div className="col-md-3 col-xs-12 content-container-left">

                                    </div>

                                    <div className="col-md-6 col-xs-12 content-container-mid" >
                                        <div className="col-md-7  col-xs-12">
                                            <div className="dice-display scrolling-container center">
                                                <div className="dice-panel">
                                                    <img src={'/images/d4.png'} className=""/>
                                                    <input className="rollbox" ref="d4-roller" placeholder="Qty:"/>
                                                </div>
                                                <div className="dice-panel">
                                                    <img src={'/images/d6.png'} className=""/>
                                                    <input className="rollbox" ref="d6-roller" placeholder="Qty:"/>
                                                </div>
                                                <div className="dice-panel">
                                                    <img src={'/images/d8.png'} className=""/>
                                                    <input className="rollbox" ref="d8-roller" placeholder="Qty:"/>    
                                                </div>
                                                <div className="dice-panel">
                                                    <img src={'/images/d10.png'} className=""/>
                                                    <input className="rollbox" ref="d10-roller" placeholder="Qty:"/>
                                                </div>
                                                <div className="dice-panel">
                                                    <img src={'/images/d12.png'} className=""/>
                                                    <input className="rollbox" ref="d12-roller" placeholder="Qty:"/>
                                                </div>
                                                <div className="dice-panel">
                                                    <img src={'/images/d20.png'} className=""/>
                                                    <input className="rollbox" ref="d20-roller" placeholder="Qty:"/>
                                                </div>
                                                <div className="dice-panel">
                                                    <img src={'/images/d100.png'} className=""/>
                                                    <input className="rollbox" ref="d100-roller" placeholder="Qty:"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3  col-xs-12">
                                            <div className="mod-block">
                                                <h4>ADD MODS</h4>
                                                <hr/>
                                                <div>
                                                    <input type="checkbox"/> STR
                                                </div>
                                                <div>
                                                    <input type="checkbox"/> DEX
                                                </div>
                                                <div>
                                                    <input type="checkbox"/> CON
                                                </div>
                                                <div>
                                                    <input type="checkbox"/> INT
                                                </div>
                                                <div>
                                                    <input type="checkbox"/> WIS
                                                </div>
                                                <div>
                                                    <input type="checkbox"/> CHA
                                                </div>
                                                <div>
                                                    <input type="checkbox"/> PROF
                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-md-2  col-xs-12 ">
                                            <div className="col-sm-12">
                                                <button className="full-width submit-button blue-button" style={{"height":"80px", "marginTop":"20px"}}>ROLL</button>
                                            </div>
                                        </div>
                                    
                                    </div>

                                    <div className="col-md-3 col-xs-12 content-container-right">
                                        <div className="spacer col-sm-12"/>
                                        <h3>Spell Slots</h3>
                                        <hr/>
                                        <div className="spell-slots scrolling-container" >
                                            <div className="spell-slot-panel ">
                                                <h5><strong>Level 1</strong></h5>
                                                <div className="toggle-box" />
                                                <div className="toggle-box" />
                                                <div className="toggle-box" />
                                                <div className="toggle-box" />

                                            </div>
                                            <div className="spell-slot-panel ">
                                                <h5><strong>Level 2</strong></h5>
                                                <div className="toggle-box" />
                                                <div className="toggle-box" />
                                                <div className="toggle-box" />
                                                <div className="toggle-box" />

                                            </div>
                                            <div className="spell-slot-panel ">
                                                <h5><strong>Level 3</strong></h5>
                                                <div className="toggle-box" />
                                                <div className="toggle-box" />
                                                <div className="toggle-box" />
                                                <div className="toggle-box" />
                                                    
                                            </div>
                                            <div className="spell-slot-panel ">
                                                <h5><strong>Level 4</strong></h5>
                                                <div className="toggle-box" />
                                                <div className="toggle-box" />
                                                <div className="toggle-box" />
                                                <div className="toggle-box" />
                                            </div>
                                            <div className="spell-slot-panel ">
                                                <h5><strong>Level 5</strong></h5>
                                                <div className="toggle-box" />
                                                <div className="toggle-box" />
                                                <div className="toggle-box" />
                                                <div className="toggle-box" />
                                                
                                            </div>
                                            <div className="spell-slot-panel ">
                                                <h5><strong>Level 6</strong></h5>
                                                <div className="toggle-box" />
                                                <div className="toggle-box" />
                                                <div className="toggle-box" />
                                                <div className="toggle-box" />
                                            </div>
                                            <div className="spell-slot-panel ">
                                                <h5><strong>Level 7</strong></h5>
                                                <div className="toggle-box" />
                                                <div className="toggle-box" />
                                                <div className="toggle-box" />
                                                <div className="toggle-box" />
                                            
                                            </div>
                                            <div className="spell-slot-panel ">
                                                <h5><strong>Level 8</strong></h5>
                                                <div className="toggle-box" />
                                                <div className="toggle-box" />
                                                <div className="toggle-box" />
                                                <div className="toggle-box" />
                                                
                                            </div>
                                            <div className="spell-slot-panel ">
                                                <h5><strong>Level 9</strong></h5>
                                                <div className="toggle-box" />
                                                <div className="toggle-box" />
                                                <div className="toggle-box" />
                                                <div className="toggle-box" />
                                                
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