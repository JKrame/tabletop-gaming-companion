import React from 'react'
import { NavLink } from 'react-router-dom';


var gmSchedule;
var characters;
export default class CampaignCardMini extends React.Component{

    constructor(props) {
        super(props);
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

        var gmSchedule = Meteor.users.findOne({_id: this.props.campaignGM}).profile.schedule;
        var userSchedule;
        var available;
        for(var i = 0; i < days.length; i++)
        {
            available = true;
            if(gmSchedule[i])
            {
                for(var j = 0; j < this.props.characters.length; j++)
                {
                    userSchedule = Meteor.users.findOne({_id: this.props.characters[j].UID}).profile.schedule;
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
                         <div onClick={this.schedule.bind(this)} className="cal-img stretch-image" draggable="false"/>
                    </div>
                </div>
            </NavLink>
        );
    }
}