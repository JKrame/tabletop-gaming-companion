import React from 'react'
import { NavLink } from 'react-router-dom';


export default class CampaignCardMini extends React.Component{
    render() {
        return (
            <NavLink to='#' onClick={() => this.props.func(this.props.id, this.props.somehistory, this.props.campaigns)} className='nav-item nav-link hoverBox'>   
                <div className="objectCardMini highlight-container grow" draggable="false">
                    <div className="objectCardMiniImage ">
                    <img src={this.props.campaignImageURL!=null && this.props.campaignImageURL!="" ? this.props.campaignImageURL : '/images/photoMissing.png'} className="stretch-image" draggable="false"/>
                    </div>
                    <div className="objectCardMiniInfo col-xs-8 container-fluid">
                        <h5 className="no-margin-override h5-overflow-hidden">{this.props.campaignName}    <img src={this.props.campaignGM !=""  && Meteor.userId() == this.props.campaignGM ? '/images/dmicon.png' : '/images/playericon.png'}/></h5>
                        <hr className="hr-override-light"/>
                        <p className="p-override no-margin-override small-text"> {this.props.campaignDescription}</p>
                    </div>
                    <div  className=" cal-buttons">
                         <div className="cal-img stretch-image" draggable="false"/>
                    </div>
                </div>
            </NavLink>
        );
    }
}