import React from 'react';
import { NavLink } from 'react-router-dom';
import {Random} from 'meteor/random';

import { Characters } from '../api/character';
import CharacterCard from '../objects/CharacterCardMini';
import CampaignCard from '../objects/CampaignCardMini';

export default class CampaignScreen extends React.Component{
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
    render() {
        return(
            <div className="page-wrapper">
                <div className="col-lg-12 fill-height">
                    <div className=" fill-height game-screen">

                        <div className="col-lg-3 fill-height content-container-left">
                            <div className="sub-content-top">
                                    <h3>Initiative</h3>
                                    <hr/>
                                    <div className="scrolling-container-content-top">
                                        {this.renderCharacterCard()}
                                    </div>

                                    <div className=" col-xs-12 bottom-button">
                                        <p className="button-text"><strong>END TURN</strong></p>
                                    </div>
                            </div>

                            <div className="sub-content-bottom">

                            </div>

                        </div>


                        <div className="col-lg-6 fill-height content-container-mid">
                            <div className="sub-content-top">
                                
                            </div>
                            <div className="sub-content-bottom">

                            </div>
                        </div>


                        <div className="col-lg-3 fill-height content-container-right">
                            <div className="sub-content-top">
                                <h3>Characters</h3>
                                <hr/>
                                <div className="scrolling-container">
                                    {this.renderCharacterCard()}
                                </div>
                            </div>
                            <div className="sub-content-bottom">

                            </div>
                        </div>


                    </div>
                </div>
            </div>
    );
  }
}  