import React from 'react'
import UserCard from '../objects/UserCard';


export default class PlayerFormPopup extends React.Component {
    componentWillMount(){
        this.playerFormPopupTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('conversations');
            if(sub.ready())
            {
                this.conversations = Conversations.find( {$or: [{"userOne._id": Meteor.userId()}, {"userTwo._id": Meteor.userId()}]}).fetch();
            }

            const sub2 = Meteor.subscribe('userData');
            if(sub2.ready())
            {
                this.users = Meteor.users.find({}).fetch();
            }

            this.forceUpdate();
        });
    }

    componentWillUnmount(){
        this.playerFormPopupTracker.stop();
    }

    renderContacts() {
        var cards = [];
        if (this.conversations){
            for (var i = 0; i < this.conversations.length; i++){
                partner = (this.conversations[i].userOne._id == Meteor.userId()) ? this.conversations[i].userTwo : this.conversations[i].userOne;
                if (!this.alreadyAPlayer(partner)){
                    cards.push(<UserCard key={i} username={partner.profile.username} accountPicture={partner.profile.accountPicture} func={this.props.addPlayer} param={partner._id}/>);
                }
            }
        }
        return <div>{cards}</div>;
    }

    alreadyAPlayer(player){
        for (var i = 0; i < this.props.players.length; i++){
            if (this.props.players[i] == player.profile.username){
                return true;
            }
        }

        return false;
    }

    addPlayer(userID){
        this.props.addPlayer(userID);
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
                                {this.renderContacts()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}