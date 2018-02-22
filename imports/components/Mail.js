import React from 'react'
import UserCardMini from '../objects/UserCard';
import UserBubble from '../objects/UserSpeechBubble';
import OtherBubble from '../objects/OtherSpeechBubble';
import ChatWindow from '../objects/ChatWindow';


export default class Mail extends React.Component{

    componentWillMount(){
        this.mailSheetTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('conversations');
            if(sub.ready())
            {
                this.conversations = Conversations.find({userID : Meteor.userId()}).fetch();
            }
            this.forceUpdate();
        });
    }

    renderPlayers() {
        if (!this.conversations){
            return;
        }

        var cards = [];

        for (var i = 0; i < this.conversations.length; i++)
        {
            cards.push(<UserCardMini key={i} id={this.conversations[i].contactID} loadConversation={this.loadConversation}/>);
        }

        return <div>{cards}</div>;
    }

    loadConversation(contactID){
        if (contactID){
            return <ChatWindow contactID={contactID}/>
        }
        else{
            return <div/>
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
                            <input type="text" className="full-width"/>
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
                                <div style={{ "width":"60px","height":"60px", "backgroundColor":"red"}}/>
                            </div>
                            <div style={{"float":"left", "width":"300px","marginLeft":"30px"}}>
                                <h4>Chatting With: xXRAWRXx_360NOXSCOPEXDXx</h4>
                            </div>
                        </div>
                        <div className="spacer col-sm-12"/>
                        <div className="spacer col-sm-12"/>
                        <div className="spacer col-sm-12"/>
                        {loadConversation}
                    </div> 
                </div>
            </div>
        </div>
    );
  }
}  