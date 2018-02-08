import React from 'react';
import { NavLink } from 'react-router-dom';

export default class CampaignCardVertical extends React.Component {

    render() {
        return (
            <NavLink to='#' onClick={() => this.props.func(this.props.id, this.props.somehistory)} className='nav-item nav-link'>   
                <div className="vertical-card col-lg-3 col-md-4 col-sm-6 col-xs-12 highlight-container">
                    <div className="vertical-card-contents">
                        <div className="vertical-image">
                            <img src={'/images/photoMissing.png'} className="full-width vertical-image"/>
                        </div>
                        <div className="vertical-data">
                            <h3>{this.props.campaignName}</h3>
                            <hr className="hr-override-light"/>
                            <p className="p-override"> {this.props.campaignDescription}</p>
                        </div>
                    </div>
                </div>
            </NavLink>
        );
    }
}