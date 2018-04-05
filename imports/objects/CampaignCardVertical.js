import React from 'react';
import { NavLink } from 'react-router-dom';

export default class CampaignCardVertical extends React.Component {

    render() {
        return (
            <NavLink to='#' onClick={() => this.props.func(this.props.id, this.props.somehistory, this.props.campaigns)} className='nav-item nav-link'>   
                <div className="vertical-card col-lg-3 col-md-4 col-sm-6 col-xs-12 highlight-container " draggable="false">
                    <div className="vertical-card-contents grow">
                        <div className="vertical-image">
                        <img src={this.props.campaignImageURL!=null && this.props.campaignImageURL!="" ? this.props.campaignImageURL : '/images/photoMissing.png'} className="stretch-image" draggable="false"/>
                        </div>
                        <div className="vertical-contents">
                            <div className="vertical-campaign-title">
                                <h3>{this.props.campaignName}</h3>
                                <hr className="hr-override-light"/>
                            </div>
                            <div className="vertical-data">
                                <p className="p-override"> {this.props.campaignDescription}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </NavLink>
        );
    }
}