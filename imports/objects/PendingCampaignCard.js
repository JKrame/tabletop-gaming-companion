import React from 'react';
import { NavLink } from 'react-router-dom';

export default class PendingCampaignCard extends React.Component {
    render() {
        return(
            <NavLink to="#" >
                <div className="objectCardMini grow add-container" onClick={this.props.toggleInvitePopup(this.props.campaignID)}>
                    <div className="objectCardMiniImage ">
                        <img src={this.props.campaignImageURL!=null && this.props.campaignImageURL!="" ? this.props.campaignImageURL : '/images/photoMissing.png'} className="stretch-image"/>
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