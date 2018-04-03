import React from 'react'
import { NavLink } from 'react-router-dom';

export default class CampaignCardHalf extends React.Component{
    render() {
        return (
            <NavLink to='#' onClick={() => this.props.func(this.props.id, this.props.somehistory, this.props.campaigns)}  className='nav-item nav-link hoverBox'>   
                <div className="objectCardHalf highlight-container grow" draggable="false">
                    <div className="objectCardHalfImage">
                        <img src={this.props.campaignImageURL!=null && this.props.campaignImageURL!="" ? this.props.campaignImageURL : '/images/photoMissing.png'}  className="stretch-image" draggable="false"/>
                    </div>
                    <div className="objectCardHalfInfo">
                        <h4 className="no-margin-override">{this.props.campaignName}</h4>
                        <hr className="hr-override-light" style={{"marginLeft":"100px", "marginRight":"10px"}}/>
                        <p className="p-override no-margin-override"> {this.props.campaignDescription}</p>
                    </div>
                    <div className="campaignCardHalfButton">
                        <button>Scheduling</button>
                    </div>
                </div>
            </NavLink>
        );
    }
}