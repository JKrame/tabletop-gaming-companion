import React from 'react'
import CampaignCardVertical from '../objects/CampaignCardVertical';

export default class Campaigns extends React.Component{
    renderCampaignCard() {
        var cards = [];
        var numcharacters = 7;
        for (var i = 0; i < numcharacters; i++)
        {
            cards.push(<CampaignCardVertical key={i}/>);
        }
        return <div>{cards}</div>;
    }

  render() {
    return(
        <div className="page-wrapper">
            <div className="col-lg-8 col-lg-offset-2">
                <div className="page-content col-xs-12 fill-height">
                    <h3>Your Campaigns</h3>
                    <hr/>
                    <div className="scrolling-container">
                        {this.renderCampaignCard()}
                    </div>
                </div>
            </div>
        </div>
    );
  }
}  