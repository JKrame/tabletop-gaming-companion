import React from 'react'
import UserCard from '../objects/UserCard';


export default class CalendarPopup extends React.Component {
    componentWillMount(){
        this.playerFormPopupTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('conversations');
            if(sub.ready())
            {
                this.conversations = Conversations.find({ participants:{$elemMatch : {id : Meteor.userId()}}}).fetch();
            }

            const sub2 = Meteor.subscribe('userData');
            if(sub2.ready())
            {
                this.users = Meteor.users.find({}).fetch();
            }

            this.forceUpdate();
        });
    }

    componentWillUnmount()
    {
        this.playerFormPopupTracker.stop();
    }

    renderSchedule()
    {
        var days = "";
        if(this.props.availableDays[0]) //Monday
        {
            days += "Monday\n";
        }
        if(this.props.availableDays[1]) //Tuesday
        {
            days += "Tuesday\n";
        }
        if(this.props.availableDays[2]) //Wednesday
        {
            days += "Wednesday\n";
        }
        if(this.props.availableDays[3]) //Thursday
        {
            days += "Thursday\n";
        }
        if(this.props.availableDays[4]) //Friday
        {
            days += "Friday\n";
        }
        if(this.props.availableDays[5]) //Saturday
        {
            days += "Saturday\n";
        }
        if(this.props.availableDays[6]) //Sunday
        {
            days += "Sunday\n";
        }

        if(days == "")
        {
            days = "There are no days where all players and GM are available.";
        }

        return <div>{days}</div>;
    }

    renderProfiles()
    {
        var profiles = "";
        var days = "";
        if(this.props.gmProfile.schedule[0]) //Monday
        {
            days += "Monday ";
        }
        if(this.props.gmProfile.schedule[1]) //Tuesday
        {
            days += "Tuesday ";
        }
        if(this.props.gmProfile.schedule[2]) //Wednesday
        {
            days += "Wednesday ";
        }
        if(this.props.gmProfile.schedule[3]) //Thursday
        {
            days += "Thursday ";
        }
        if(this.props.gmProfile.schedule[4]) //Friday
        {
            days += "Friday ";
        }
        if(this.props.gmProfile.schedule[5]) //Saturday
        {
            days += "Saturday ";
        }
        if(this.props.gmProfile.schedule[6]) //Sunday
        {
            days += "Sunday ";
        }
        profiles += this.props.gmProfile.username + " (GM) is available " + days;

        for(var i = 0; i < this.props.allPlayerProfiles.length; i++)
        {
            days = "";
            if(this.props.allPlayerProfiles[i].schedule[0]) //Monday
            {
                days += "Monday ";
            }
            if(this.props.allPlayerProfiles[i].schedule[1]) //Tuesday
            {
                days += "Tuesday ";
            }
            if(this.props.allPlayerProfiles[i].schedule[2]) //Wednesday
            {
                days += "Wednesday ";
            }
            if(this.props.allPlayerProfiles[i].schedule[3]) //Thursday
            {
                days += "Thursday ";
            }
            if(this.props.allPlayerProfiles[i].schedule[4]) //Friday
            {
                days += "Friday ";
            }
            if(this.props.allPlayerProfiles[i].schedule[5]) //Saturday
            {
                days += "Saturday ";
            }
            if(this.props.allPlayerProfiles[i].schedule[6]) //Sunday
            {
                days += "Sunday ";
            }
            profiles += this.props.allPlayerProfiles[i].username + " is available " + days;
        }
        return <div>{profiles}</div>;
    }

    render() {
        return (
            <div className='popup'>
                <div className="add-player-popup popup_inner">
                    <h2>{this.props.campaignName} Player Scheduling</h2>
                    <div className="col-sm-12">
                        {this.renderSchedule()}
                        {this.renderProfiles()}
                        <div className="right-align">
                            <button onClick={this.props.closePopup} className=" submit-button button">Close</button>
                        </div>       
                        <div className="spacer col-sm-12"/>                      
                        <div className="spacer col-sm-12"/>
                        <div className="full-height">
                            <div className="scrolling-container" style={{"height":"250px", "width":"340px"}}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}