import React from 'react'
import UserCard from '../objects/UserCard';


export default class PlayerFormPopup extends React.Component {
    componentWillMount(){
        this.playerFormPopupTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('conversations');
            if(sub.ready())
            {
                this.conversations = Conversations.find( {$or: [{userID: Meteor.userId()}, {contactID: Meteor.userId()}]}).fetch();
            }

            const sub2 = Meteor.subscribe('userData');
            if(sub2.ready())
            {
                this.users = Meteor.users.find({}).fetch();
            }

            this.forceUpdate();
        });
    }

    renderContacts() {
        var cards = [];
        console.log("playerformpopup convos");
        console.log(this.conversations);
        console.log(this.users);
        if (this.conversations && this.users){
            for (var i = 0; i < this.conversations.length; i++){
                for(var j = 0; j < this.users.length; j++){
                    if (this.users[j]._id == this.conversations[i].userID){
                        if (this.conversations[i].userID == Meteor.userId()){
                            cards.push(<UserCard key={i} username={this.conversations[i].contactUsername}/>);
                        }
                        else{
                            cards.push(<UserCard key={i} username={this.conversations[i].username}/>);
                        }
                    }
                }
            }
        }
        return <div>{cards}</div>;
    }

    render() {
        console.log("render playformpupu");
        return (
            <div className='popup'>
                <div className="add-player-popup popup_inner">
                    <h2>Enter Player Username</h2>
                    <input type="text" className="full-width"/>
                    <div className="col-sm-12">
                        <div className="right-align">
                            <button onClick={this.props.closePopup} className=" submit-button button">Cancel</button>
                            <button className="submit-button blue-button button">Add Player</button>
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