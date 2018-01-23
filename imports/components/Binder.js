import React from 'react'
import CharacterCardHalf from '../objects/CharacterCardHalf';
import CampaignCardHalf from '../objects/CampaignCardHalf';

export default class Binder extends React.Component{
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
    render() {
        return(
        <div className="page-wrapper">
            <div className="col-lg-8 col-lg-offset-2">
                <div className="page-content col-xs-12" >
                <div className="col-lg-6 split-page-left">
                    <h3>Your Characters >></h3>
                    <hr/>
                    {this.renderCharacterCard()}
                    <div className="objectCardHalf ">
                        <div className="objectCardHalfImage">
                            <img src={'/images/addIcon.png'}/>
                        </div>
                        <div className="objectCardHalfInfo container-fluid">
                            <h4>CREATE NEW CHARACTER</h4>
                            <hr className="hr-override container-fluid"/>
                        </div>
                    </div>

                </div>
                <div className="col-lg-6 split-page-right">
                    <h3>Your Campaigns >></h3>
                    <hr className="container-fluid"/>
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

                    <div className="objectCardHalf ">
                        <div className="objectCardHalfImage">
                            <img src={'/images/addIcon.png'}/>
                        </div>
                        <div className="objectCardHalfInfo container-fluid">
                            <h4>CREATE NEW CAMPAIGN</h4>
                            <hr className="hr-override container-fluid"/>
                        </div>
                    </div>
                    
                </div>
                </div>
            </div>
            </div>
        );
    }
}  