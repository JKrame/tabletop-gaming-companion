import React from 'react'
import UserCard from '../objects/UserCard';
import UserCardMicro from '../objects/UserCardMicro';
import ChatWindow from '../objects/ChatWindow';

var searchPlayerUsername = "";
var searchPlayerURL = null;
var users;

export default class Mail extends React.Component{
    constructor(props) {
        super(props);
        this.state = { conversation: null, contactUsername: null } ;
    }

    componentWillMount(){
        this.mailSheetTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('conversations');
            if(sub.ready())
            {
                this.conversations = Conversations.find( {$or: [{userID: Meteor.userId()}, {contactID: Meteor.userId()}]}).fetch();
                console.log("Mail this.conversations: ");
                console.log(this.conversations);
                if (this.state.conversation != null){
                    for(i = 0; i < this.conversations.length; i++){
                        if (this.conversations[i]._id == this.state.conversation._id){
                            this.setState({conversation: this.conversations[i]});
                            console.log("conversation updated");
                        }
                    }
                }
            }

            const sub2 = Meteor.subscribe('userData');
            if(sub2.ready())
            {
                this.users = Meteor.users.find({}).fetch();
                console.log("Mail this.users: ");
                console.log(this.users);
                for(var i = 0; i < this.users.length; i++)
                {
                    if(this.users[i]._id == Meteor.userId())
                    {
                        this.username = this.users[i].profile.username;
                        break;
                    }
                }
            }

            this.forceUpdate();
        });
    }

    findPlayer() {
        var username = this.refs.friendSearchInput.value;
        var image;
        var found = false;

        for(var i = 0; i < this.users.length; i++)
        {
            if(this.users[i].profile.username == username)
            {
                found = true;
                user = this.users[i];
                image = this.users[i].profile.accountPicture;
                break;
            }
        }

        if(!found)
        {
            alert(username + " does not exist.");
            return;
        }
        else if(user._id == Meteor.userId()){
            alert("You cannot message yourself");
        }
        else
        {
            alreadyFriends = false;
            for (i = 0; i < this.conversations.length; i++){
                if (user.id == this.conversations[i].contactID){
                    alreadyFriends = true;
                }
            }

            if (!alreadyFriends){
                Meteor.call('conversations.insert', this.username, user._id, user.profile.username);
                this.searchPlayerUsername = username;
                this.searchPlayerURL = image
            }
        }
    }

    renderPlayers() {
        if (!this.conversations){
            return;
        }

        var cards = [];

        for (var i = 0; i < this.conversations.length; i++)
        {
            cards.push(<UserCard key={i} conversation={this.conversations[i]} loadConversation={this.loadConversation.bind(this)}/>);
        }

        return <div>{cards}</div>;
    }

    loadConversation(conversation) {
        if (conversation){ 
            this.setState({conversation: conversation});

            if (conversation.userID == Meteor.userId()){
                this.setState({contactUsername : conversation.contactUsername});
            }
            else{
                this.setState({contactUsername : conversation.username});
            }

            this.forceUpdate();
        }
    }

    sendMessage(){
        if (this.state.conversation){
            message = this.refs.messageBox.value;
            Meteor.call('conversations.sendMessage', this.state.conversation._id, message);
            this.loadConversation(this.state.conversation);
        }
    }

  render() {
    return(
        <div className="page-wrapper">
            <div className="col-lg-8 col-lg-offset-2">
                <div className=" col-xs-12 fill-height scrolling-container" >
                    <div className="col-lg-4">
                        <div className="page-content col-sm-12" style={{"height":"200px"}}>
                            <p>Find Friends</p>
                            <input type="text" ref="friendSearchInput" className="full-width"/>
                            <button onClick={() => this.findPlayer()} className="full-width blue-button" >Find</button>
                            <UserCardMicro userImageURL={this.searchPlayerURL} username={this.searchPlayerUsername}/>
                        </div>
                        <div className="spacer col-sm-12"/>                      
                        <div className="spacer col-sm-12"/>
                        <div className="col-sm-12">
                            <h3>Friend List</h3>
                            <hr/>
                            <div className="scrolling-container"  style={{"height":"545px"}}>
                                <UserCard id={"test"} loadConversation={this.loadConversation.bind(this)} characterImageURL={"http://i.telegraph.co.uk/multimedia/archive/03597/POTD_chick_3597497k.jpg"}/>
                                {this.renderPlayers()}
                            </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="page-content col-sm-12" style={{"height":"80px"}}>
                        <div style={{"float":"left"}}>
                            <div style={{ "width":"60px","height":"60px", "backgroundColor":"red"}}/>
                        </div>
                        <div style={{"float":"left", "width":"300px","marginLeft":"30px"}}>
                            <h4>Chatting With: {this.state.contactUsername}</h4>
                        </div>
                    </div>
                    <div className="spacer col-sm-12"/>
                    <div className="spacer col-sm-12"/>
                    <div className="spacer col-sm-12"/>
                            <ChatWindow conversation={this.state.conversation}/>
                            <div className="col-sm-12 page-content">
                                <div className="col-sm-9">
                                    <textarea type="text" ref="messageBox" style={{"height":"200px"}} className="full-width"/>
                                </div>
                                <div className="col-sm-3 negate-margins">
                                        <button onClick={this.sendMessage.bind(this)} className="full-width blue-button" style={{"height":"50px", "marginTop":"150px"}}>SEND</button>
                                </div>
                            </div>
                        </div> 
                </div> 
            </div>
        </div>
    );
  }
}  