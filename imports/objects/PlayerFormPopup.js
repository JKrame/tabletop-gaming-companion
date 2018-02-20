import React from 'react'
import UserCardMini from '../objects/UserCard';


export default class PlayerFormPopup extends React.Component {

  renderContacts() {
    var cards = [];
    var numcharacters = 12;
    for (var i = 0; i < numcharacters; i++)
    {
        cards.push(<UserCardMini key={i}/>);
    }
    return <div>{cards}</div>;
}
    render() {
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