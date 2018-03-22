import React from 'react';
import { NavLink } from 'react-router-dom';

export default class PendingCampaignCard extends React.Component {
    render() {
        console.log("from within the card" + this.props.campaignID);
        var campaignID = this.props.campaignID;
        return(
            <NavLink to="#" >
                <div className="objectCardMini grow add-container">
                    <div className="objectCardMiniImage ">
                        <img src={this.props.campaignImageURL!=null && this.props.campaignImageURL!="" ? this.props.campaignImageURL : '/images/photoMissing.png'} className="stretch-image" draggable="false"/>
                    </div>
                    <div className="objectCardMiniInfo container-fluid">
                        <h4 className="no-margin-override">{this.props.campaignName} - PENDING INVITE</h4>
                        <hr className="hr-override-light"/>
                        <p className="p-override">Click for Details...</p>
                    </div>
                </div>
            </NavLink>
        );
    }
}