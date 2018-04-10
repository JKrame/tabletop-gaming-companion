import React from 'react'


export default class PlayerFormPopup extends React.Component {
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


    alreadyInvited(player)
    {
        for (var i = 0; i < this.props.pendingInvites.length; i++)
        {
            if (this.props.pendingInvites[i] == player._id)
            {
                return true;
            }
        }

        for (var i = 0; i < this.props.characters.length; i++)
        {
            if (this.props.characters[i].UID == player._id)
            {
                return true;
            }
        }
        return false;
    }

    addPlayer()
    {
        var username = this.refs.username.value;
        //console.log(username);
        var invitedUser = Meteor.users.findOne({"profile.username" : username});
        var currentCharacters = Campaigns.findOne({_id : this.props.campaignID}).characters;

        if (invitedUser == null || invitedUser == undefined)
        {
            alert("Username does not exist.");
            return;
        }
        var invitedUserID = invitedUser._id;
        if (invitedUserID == Meteor.userId())
        {
            alert("You cannot add yourself to your own campaign.");
            return;
        }
        
        for (var i = 0; i < currentCharacters.length; i++)
        {
            if (currentCharacters[i].UID == invitedUserID)
            {
                alert("Player already invited.");
                return;
            }
        }

        this.props.addPlayer(username);
    }

    render() {
        return (
            <div className='popup'>
                <div className="add-player-popup popup_inner">
                    <h2>Enter Player Username</h2>
                    <input type="text" ref="username" className="full-width"/>
                    <div className="col-sm-12">
                        <div className="right-align">
                            <button onClick={this.props.closePopup} className=" submit-button button">Cancel</button>
                            <button onClick={this.addPlayer.bind(this)} className="submit-button blue-button button">Add Player</button>
                        </div>       
                        <div className="spacer col-sm-12"/>                      
                        <div className="spacer col-sm-12"/>
                        <h4>Or select from Contacts</h4>
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