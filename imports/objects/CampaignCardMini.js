import React from 'react';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'react';

var gmSchedule;
var characters;
export default class CampaignCardMini extends React.Component{

    constructor() {
        super();
        this.schedule = this.schedule.bind(this);
    }
    schedule(e)
    {
        if (!e)
        {
            var e = window.event;
        }
        e.cancelBubble = true;
        if (e.stopPropagation)
        {
            e.stopPropagation();
        }

        if(this.props.characters == undefined)
        {
            console.log("No characters in Campaign");
            alert("No characters in Campaign. Unable to Schedule.");
            return;
        }

        var days = [];
        days.push(false); //Monday
        days.push(false); //Tuesday
        days.push(false); //Wednesday
        days.push(false); //Thursday
        days.push(false); //Friday
        days.push(false); //Saturday
        days.push(false); //Sunday

        var gmProfile = Meteor.users.findOne({_id: this.props.campaignGM}).profile;
        var gmSchedule = gmProfile.schedule;
        var userSchedule;
        var allPlayerProfiles = [];
        var available;
        for(var i = 0; i < days.length; i++)
        {
            available = true;
            if(gmSchedule[i])
            {
                for(var j = 0; j < this.props.characters.length; j++)
                {
                    userSchedule = Meteor.users.findOne({_id: this.props.characters[j].UID}).profile;
                    if(i == 0) allPlayerProfiles.push(userSchedule);
                    console.log(this.props.characters.length);
                    userSchedule = userSchedule.schedule;
                    if(userSchedule[i] == false)
                    {
                        available = false;
                        break;
                    }
                }
                if(available)
                {
                    days[i] = true;
                }
            }
        }
        console.log(days);
        this.props.toggleCalendarPopup(this.props.campaignName, days, allPlayerProfiles, gmProfile);
    }
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
                         <div onClick={this.schedule} className="cal-img stretch-image" draggable="false"/>
                    </div>
                </div>
            </NavLink>
        );
    }
}