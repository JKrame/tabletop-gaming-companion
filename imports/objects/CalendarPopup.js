import React from 'react'


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
        return(
            <div>
                <div className="userName-schedule-label"><h2>Common Availability</h2></div>
                <div className="schedule-labels">
                    <div className="schedule-label">Su</div>
                    <div className="schedule-label">M</div>
                    <div className="schedule-label">T</div>
                    <div className="schedule-label">W</div>
                    <div className="schedule-label">Th</div>
                    <div className="schedule-label">F</div>
                    <div className="schedule-label">S</div>
                </div>
                <div className="schedule-view">
                    {this.props.availableDays[6] ? <div className="open-sched"/> : <div className="close-sched"/>}
                    {this.props.availableDays[0] ? <div className="open-sched"/> : <div className="close-sched"/>}
                    {this.props.availableDays[1] ? <div className="open-sched"/> : <div className="close-sched"/>}
                    {this.props.availableDays[2] ? <div className="open-sched"/> : <div className="close-sched"/>}
                    {this.props.availableDays[3] ? <div className="open-sched"/> : <div className="close-sched"/>}
                    {this.props.availableDays[4] ? <div className="open-sched"/> : <div className="close-sched"/>}
                    {this.props.availableDays[5] ? <div className="open-sched"/> : <div className="close-sched"/>}
                </div>
            </div>
        );
    }

    
    renderGMProfile()
    {
        var days = "";
        return(
            <div>
                <div className="userName-schedule-label">{this.props.gmProfile.username}</div>
                <div className="schedule-labels">
                    <div className="schedule-label">Su</div>
                    <div className="schedule-label">M</div>
                    <div className="schedule-label">T</div>
                    <div className="schedule-label">W</div>
                    <div className="schedule-label">Th</div>
                    <div className="schedule-label">F</div>
                    <div className="schedule-label">S</div>
                </div>
                <div className="schedule-view">
                    {this.props.gmProfile.schedule[6] ? <div className="open-sched"/> : <div className="close-sched"/>}
                    {this.props.gmProfile.schedule[0] ? <div className="open-sched"/> : <div className="close-sched"/>}
                    {this.props.gmProfile.schedule[1] ? <div className="open-sched"/> : <div className="close-sched"/>}
                    {this.props.gmProfile.schedule[2] ? <div className="open-sched"/> : <div className="close-sched"/>}
                    {this.props.gmProfile.schedule[3] ? <div className="open-sched"/> : <div className="close-sched"/>}
                    {this.props.gmProfile.schedule[4] ? <div className="open-sched"/> : <div className="close-sched"/>}
                    {this.props.gmProfile.schedule[5] ? <div className="open-sched"/> : <div className="close-sched"/>}
                </div>
            </div>
        );
    }

    renderProfiles()
    {
        var profiles="";

        return(
            <div>
                {this.props.allPlayerProfiles.map(function(name){
                    return(
                        <div>
                            <div className="userName-schedule-label">{name.username}</div>
                            <div className="schedule-labels">
                                <div className="schedule-label">Su</div>
                                <div className="schedule-label">M</div>
                                <div className="schedule-label">T</div>
                                <div className="schedule-label">W</div>
                                <div className="schedule-label">Th</div>
                                <div className="schedule-label">F</div>
                                <div className="schedule-label">S</div>
                            </div>
                            <div className="schedule-view">
                                {name.schedule[6] ? <div className="open-sched"/> : <div className="close-sched"/>}
                                {name.schedule[0] ? <div className="open-sched"/> : <div className="close-sched"/>}
                                {name.schedule[1] ? <div className="open-sched"/> : <div className="close-sched"/>}
                                {name.schedule[2] ? <div className="open-sched"/> : <div className="close-sched"/>}
                                {name.schedule[3] ? <div className="open-sched"/> : <div className="close-sched"/>}
                                {name.schedule[4] ? <div className="open-sched"/> : <div className="close-sched"/>}
                                {name.schedule[5] ? <div className="open-sched"/> : <div className="close-sched"/>}
                            </div>
                            <div className="spacer col-sm-12"/>
                            <div className="spacer col-sm-12"/>                     
                        </div>
                    )
                })}
            </div>
        )
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
            profiles += this.props.allPlayerProfiles[i].username + " is available " + days +"<br/>";
        }

        return(
            <div>
                <div className="userName-schedule-label">{this.props.gmProfile.username}</div>
            </div>
        )

    }

    render() {
        return (
            <div className='popup'>
                <div className="schedule-popup popup_inner">
                    <h1 style={{textAlign:"center"}}><strong>{this.props.campaignName} Scheduling</strong></h1>
                    <div className="spacer col-sm-12"/>
                    <div className="spacer col-sm-12"/>
                    <div className="spacer col-sm-12"/>

                    <div className="col-sm-12 schedule-scroller">
                        {this.renderSchedule()}
                        <div className="spacer col-sm-12"/>
                        <div className="spacer col-sm-12"/>
                        {this.renderGMProfile()}
                        <div className="spacer col-sm-12"/>
                        <div className="spacer col-sm-12"/>
                        {this.renderProfiles()}
                    </div>

                    <div className="right-align">
                        <button onClick={this.props.closePopup} className=" submit-button button " >Close</button>
                    </div>       
                </div>
            </div>
        );
    }
}