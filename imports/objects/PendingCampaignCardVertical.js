import React from 'react';
import { NavLink } from 'react-router-dom';

export default class PendingCampaignCardVertical extends React.Component {
    render() {
        return(
            <NavLink to="#" >
                <div className="vertical-card col-lg-3 col-md-4 col-sm-6 col-xs-12 highlight-container">
                    <div className="vertical-card-contents">
                        <div className="vertical-image">
                            <img src={this.props.campaignImageURL!=null && this.props.campaignImageURL!="" ? this.props.campaignImageURL : '/images/photoMissing.png'} className="full-width vertical-image"/>
                        </div>
                        <div className="vertical-data">
                            <h3 className="no-margin-override">{this.props.campaignName} - PENDING INVITE</h3>
                            <p className="p-override">Click for Details...</p>
                        </div>
                    </div>
                </div>
            </NavLink>
        );
    }
}