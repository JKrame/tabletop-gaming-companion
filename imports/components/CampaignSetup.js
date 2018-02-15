import React from 'react'
import { NavLink } from 'react-router-dom';
import CharacterCardMini from '../objects/CharacterCardMini';
import CharacterCardHalf from '../objects/CharacterCardHalf';
import TextAssetcard from '../objects/TextAssetCard';
import ImageAssetCard from '../objects/ImageAssetCard';

var name;
var description;
var meetTime;
var meetDate;
var players;
var gm;
var notes;
var turnOrder;
var URLs;

export default class CampaignSetup extends React.Component{

    componentWillMount(){
        this.id = this.props.match.params._id;
        this.campaignSheetTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('campaigns');
            if(sub.ready())
            {
                this.campaign = Campaigns.findOne({_id : this.id});
                this.forceUpdate();               
            }
        });
    }

    componentWillUnmount(){
        this.campaignSheetTracker.stop();
    }
    
    renderCharacterCard() {
        var cards = [];
        var numcharacters = 4;
        for (var i = 0; i < numcharacters; i++)
        {
            cards.push(<CharacterCardMini key={i}/>);
        }
        return <div>{cards}</div>;
    }
    
    loadCharacter(characterID){
        if (!characterID){
            characterID = Random.id();
        }

        this.props.history.push('/character/edit/' + characterID);
    }

    renderPlayers() {
        var cards = [];
        var numcharacters = 4;
        for (var i = 0; i < numcharacters; i++)
        {
            cards.push(<CharacterCardMini key={i}/>);
        }
        return <div>{cards}</div>;
    }

    renderTextAssets() {
        var cards = [];
        for (var i = 0; i < this.campaign.notes.length; i++)
        {
            cards.push(<TextAssetcard key={i} noteTitle={this.campaign.notes[i][0]} noteDescription={this.campaign.notes[i][1]}/>);
        }
        return <div>{cards}</div>;
    }

    insertTextAssets(newTitle, newNote) {
        notes = [newTitle, newNote]//null;//{title=newTitle,note=newNote};
        Meteor.call("campaignNote.push", 
            _id = this.id,
            notes,    
        );
    }

    addPlayer(userID, characterID) {
        players = [userID, characterID]

        Meteor.call("campaignPlayer.push", 
            _id = this.id,
            players,    
        );
    }
    
    updateTextAssets(){
        console.log("fix this mike");
    }

    renderImageAssets() {
        var cards = [];
        for (var i = 0; i < this.campaign.URLs.length; i++)
        {
            cards.push(<ImageAssetCard key={i} URL={this.campaign.URLs[i]}/>);
        }
        return <div>{cards}</div>;
    }

    deleteCampaign(){
        if(confirm('Delete this campaign?')) {
            Meteor.call('campaigns.remove', this.id);
            window.location.replace("/home");
        }
    }

    saveChanges(){
        name = this.refs.campaignTitle.value;
        description = this.refs.campaignDescription.value;
        campaignImageURL = this.refs.campaignImageURL.value;

        Campaigns.update({
            _id : this.id},{
                $set:{
                    name, 
                    description, 
                    campaignImageURL}});
    }

    addImageAsset(){
        Meteor.call("campaignImage.push", 
            this.id,
            this.refs.newImageURL.value,    
        );
    }

    render() {
        if (this.campaign == null){
            return (<div></div>);
        }

        return(
            <div className="page-wrapper">
                <div className="col-lg-8 col-lg-offset-2">
                    <div className="page-content col-xs-12 fill-height scrolling-container" >
                        <div className="col-lg-8">
                            <div className="spacer col-sm-12"/>
                            
                            <h3>Campaign Title</h3>
                                <hr/>
                                <div className="scrolling-container">
                                    <input type="text" ref="campaignTitle" defaultValue={this.campaign.name != null ? this.campaign.name : ""} className="fill-width"/>
                                </div>

                                <div className="spacer col-sm-12"/>                      
                                <div className="spacer col-sm-12"/>
                                <div className="spacer col-sm-12"/>                      
                                <div className="spacer col-sm-12"/>
                                
                            <h3>Campaign Description</h3>
                            <hr/>
                            <div className="scrolling-container">
                                <input type="text" ref="campaignDescription" defaultValue={this.campaign.description != null ? this.campaign.description : ""} style={{"height":"150px"}} className="fill-width"/>
                            </div>

                            <div className="spacer col-sm-12"/>                      
                            <div className="spacer col-sm-12"/>
                            <div className="spacer col-sm-12"/>                      
                            <div className="spacer col-sm-12"/>

                            <h3>NPCs</h3>
                            <hr/>
                            <div className=" height-600 scrolling-container">
                                {this.renderPlayers()}

                                <NavLink to='#' onClick={() => this.loadCharacter()} className='nav-item nav-link'>   
                                    <div className="objectCardMini add-container">
                                        <div className="objectCardMiniImage">
                                            <img src={'/images/addIcon.png'} className="stretch-image"/>
                                        </div>
                                        <div className="objectCardMiniInfo container-fluid">
                                            <h5 className="no-margin-override overflow-hidden">ADD NEW NPC</h5>
                                            <hr className="hr-override-light"/>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>

                            <div className="spacer col-sm-12"/>                      
                            <div className="spacer col-sm-12"/>
                            <div className="spacer col-sm-12"/>                      
                            <div className="spacer col-sm-12"/>

                            <h3>Text Assets</h3>
                            <hr/>
                            <div className="">
                                {this.renderTextAssets()}
                                <a>
                                    <div className='nav-item nav-link'>   
                                        <div className="objectCardMini add-container">
                                            <div onClick={() => this.insertTextAssets(this.refs.newNoteTitle.value, this.refs.newNoteText.value)} className="textCardMiniImage">
                                                <img src={'/images/addIcon.png'} className="stretch-image"/>
                                            </div>
                                            <div className="col-xs-5">
                                                <input className="full-width" type="text" ref="newNoteTitle" placeholder=""/>
                                            </div>
                                            <div className="col-xs-10">
                                                <input className="full-width" type="text" ref="newNoteText" placeholder=""/>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className="spacer col-sm-12"/>                      
                            <div className="spacer col-sm-12"/>
                            <div className="spacer col-sm-12"/>                      
                            <div className="spacer col-sm-12"/>

                            <h3>Image Assets</h3>
                            <hr/>
                            <div className="flex-grid container-fluid">
                                {this.renderImageAssets()}

                                <div className='nav-item nav-link'>   
                                    <div className="objectCardMini grid-item add-container">
                                        <img onClick={this.addImageAsset.bind(this)} src={'/images/addIcon.png'} className="stretch-image"/>
                                        <input className="full-width" type="text" ref="newImageURL"/>
                                    </div>
                                </div>
                            </div>

                            <div className="spacer col-sm-12"/>                      
                            <div className="spacer col-sm-12"/>
                            <div className="spacer col-sm-12"/>                      
                            <div className="spacer col-sm-12"/>

                            <div className="col-sm-12">
                                <button onClick={this.saveChanges.bind(this)} className="full-width submit-button blue-button">SAVE CHANGES</button>
                            </div>                        
                            <div className="spacer col-sm-12"/>
                            
                            <div className="col-sm-12">
                                <button onClick={this.deleteCampaign} className="full-width submit-button">DELETE CAMPAIGN</button>
                            </div>  
                            <div className="spacer col-sm-12"/>
                            


                        </div> 

                        
                        <div className="col-lg-4">

                            <div className="spacer col-sm-12"/>                      
                            <div className="spacer col-sm-12"/>
                            <div className="spacer col-sm-12"/> 
                            <div className="spacer col-sm-12"/>
                                              

                            <div className="col-sm-12">
                                <NavLink to={'/campaigns/' + this.campaign._id} className='nav-item nav-link'><button className="full-width submit-button blue-button">ENTER CAMPAIGN</button></NavLink>
                            </div>
                            
                            <div className="spacer col-sm-12"/>                      
                            <div className="spacer col-sm-12"/>
                            <div className="spacer col-sm-12"/>                      
                            <div className="spacer col-sm-12"/>


                            <h3>Campaign Image</h3>
                            <hr/>
                            <img src={this.campaign != null && this.campaign.campaignImageURL != null && this.campaign.campaignImageURL != "" ? this.campaign.campaignImageURL : '/images/photoMissing.png'} className="full-width"/>
                            <div className="spacer col-sm-12"/>

                            <div className="col-sm-12">
                                <p className="p-override">IMAGE URL</p>
                                <input className="full-width" type="text" ref="campaignImageURL" defaultValue={this.campaign.campaignImageURL != null ? this.campaign.campaignImageURL : ""}/>
                            </div>

                            <div className="spacer col-sm-12"/>                      
                            <div className="spacer col-sm-12"/>
                            <div className="spacer col-sm-12"/>                      
                            <div className="spacer col-sm-12"/>

                            <h3>Player List >></h3>
                            <hr/>
                            <div className="scrolling-container">
                                {this.renderPlayers()}
                                <div>
                                    <input type="text" ref="addplayer" className="fill-width" placeholder=""/> 
                                    <input type="text" ref="addcharacter" className="fill-width" placeholder=""/> 
                                </div>
                                <div onClick={() => this.addPlayer(this.refs.addplayer.value, this.refs.addcharacter.value)} className='nav-item nav-link'> 
                                    <div className="objectCardMini add-container">
                                        <div className="objectCardMiniImage">
                                            <img src={'/images/addIcon.png'} className="stretch-image"/>
                                        </div>
                                        <div className="objectCardMiniInfo container-fluid">
                                            <h5 className="no-margin-override overflow-hidden">ADD NEW PLAYER</h5>
                                            <hr className="hr-override-light"/>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="spacer col-sm-12"/>                      
                            <div className="spacer col-sm-12"/>
                            <div className="col-sm-12">
                                <button className="full-width submit-button blue-button">ADD TO ADVENTURE BOARD</button>
                            </div>
                            <div className="spacer col-sm-12"/>                      
                            <div className="spacer col-sm-12"/>
                            <div className="col-sm-12">
                                <button className="full-width submit-button ">REMOVE FROM ADVENTURE BOARD</button>
                            </div>
                            
                        </div>

                        
                    </div>
                </div>
            </div>
    );
  }
}