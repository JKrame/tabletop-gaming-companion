import React from 'react'
import UserCard from '../objects/UserCard';
import UserCardMicro from '../objects/UserCardMicro';
import ChatWindow from '../objects/ChatWindow';

import Header from './Header';

var searchPlayerUsername = "";
var searchPlayerURL = null;
var users;

export default class Mail extends React.Component{
    constructor(props){
        super(props);
        this.state = { conversation: null, contactUsername: null, conversationList: null, contactImage: null } ;
    }

    componentWillMount(){
        this.mailSheetTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('conversations');
            if(sub.ready())
            {
                id = Meteor.userId();
                console.log(id);
                this.conversations = Conversations.find().fetch();
                this.setState({conversationList: this.conversations});
                if (this.state.conversation != null){
                    for(i = 0; i < this.conversations.length; i++){
                        if (this.conversations[i]._id == this.state.conversation._id){
                            this.setState({conversation: this.conversations[i]});
                        }
                    }
                }
                else if (this.conversations.length > 0){
                    this.setState({conversation: this.conversations[0]});
                }
            }

            const sub2 = Meteor.subscribe('userData');
            if(sub2.ready())
            {
                this.users = Meteor.users.find({}).fetch();
                for(var i = 0; i < this.users.length; i++)
                {
                    if(this.users[i]._id == Meteor.userId())
                    {
                        this.user = this.users[i];
                        break;
                    }
                }
            }

            this.forceUpdate();
        });
    }

    componentWillUnmount(){
        this.mailSheetTracker.stop();
    }

    findPlayer() {
        var username = this.refs.friendSearchInput.value;
        var image;
        var found = false;
        var contact;

        for(var i = 0; i < this.users.length; i++)
        {
            if(this.users[i].profile.username == username)
            {
                found = true;
                contact = this.users[i];
                image = this.users[i].profile.accountPicture;
                break;
            }
        }
        
        if(!found)
        {
            alert(username + " does not exist.");
            return;
        }
        else if(contact._id == Meteor.userId()){
            alert("You cannot message yourself.");
        }
        else
        {
            
            for(i = 0; i < this.conversations.length; i++)
            {
                console.log(this.conversations[i]);
                console.log(this.conversations[i].participants[0].id)
                console.log(this.conversations[i].participants[1].id)
                if(contact._id == this.conversations[i].participants[0].id)
                {
                    return;
                }
                else if(contact._id == this.conversations[i].participants[1].id)
                {
                    return;
                }
            }
            
            Meteor.call('conversations.insert', this.user, contact);
            
            console.log(contact);
            this.searchPlayerUsername = username;
            this.searchPlayer = contact;
            this.searchPlayerURL = image;
        }
    }

    renderPlayers() {
        if (!this.conversations){
            return;
        }

        var cards = [];
        if (this.conversations){
            for (var i = 0; i < this.conversations.length; i++){
                partner = (this.conversations[i].participants[0].id == Meteor.userId()) ? this.conversations[i].participants[1] : this.conversations[i].participants[0];
                cards.push(<UserCard
                    key={i} 
                    username={partner.name} 
                    accountPicture={partner.picture} 
                    param={this.conversations[i]} 
                    func={this.loadConversation.bind(this)}/>);
            }
        }

        return <div>{cards}</div>;
    }

    loadConversation(conversation) {
        if (conversation){ 
            this.setState({conversation: conversation});

            if (conversation.participants[0].id == Meteor.userId()){
                this.setState({contactUsername : conversation.participants[1].name, contactImage : conversation.participants[1].image});
                
            }
            else{
                this.setState({contactUsername : conversation.participants[0].name, contactImage : conversation.participants[0].image});
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
        <Header/>
            <div className="col-lg-8 col-lg-offset-2">
                <div className=" col-xs-12 fill-height scrolling-container" >
                    <div className="col-lg-4">
                        <div className="page-content col-sm-12" style={{"height":"200px"}}>
                            <p>Find Friends</p>
                            <input type="text" ref="friendSearchInput" className="full-width"/>
                            <button onClick={() => this.findPlayer()} className="full-width blue-button" >Find</button>
                            <UserCardMicro userImageURL={this.searchPlayerURL} username={this.searchPlayerUsername} contact={this.searchPlayer} user={this.user}/>
                        </div>
                        <div className="spacer col-sm-12"/>                      
                        <div className="spacer col-sm-12"/>
                        <div className="col-sm-12">
                            <h3>Friend List</h3>
                            <hr/>
                            <div className="scrolling-container"  style={{"height":"545px"}}>
                                {this.renderPlayers()}
                            </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="page-content col-sm-12" style={{"height":"80px"}}>
                        <div style={{"float":"left"}}>
                            <img src={this.state.contactImage != null && this.state.contactImage != "" ? this.state.contactImage : '/images/photoMissing.png'}  style={{ "width":"60px","height":"60px"}}/>
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