import React from 'react'
import { NavLink } from 'react-router-dom';
import { Random } from 'meteor/random';
import CharacterCardMini from '../objects/CharacterCardMini';
import CharacterCardMiniWithOwner from '../objects/CharacterCardMiniWithOwner';
import CharacterCardHalf from '../objects/CharacterCardHalf';
import TextAssetcard from '../objects/TextAssetCard';
import ImageAssetCard from '../objects/ImageAssetCard';
import UserCardMini from '../objects/UserCard';
import ImagePopup from '../objects/ImageFormPopup';
import PlayerPopup from '../objects/PlayerFormPopup';

export default class CampaignSetup extends React.Component{
    constructor() {
        super();
        this.state = {
            showImagePopup: false,
            showPlayerPopup: false
        };
    }

    toggleImagePopup() {
        this.setState({
            showImagePopup: !this.state.showImagePopup
        });
    }

    togglePlayerPopup() {
        this.setState({
            showPlayerPopup: !this.state.showPlayerPopup
        });
    }

    componentWillMount(){
        this.id = this.props.match.params._id;
        this.campaignSheetTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('campaigns');
            const sub2 = Meteor.subscribe('characters');
            const sub3 = Meteor.subscribe('userData');
            if(sub.ready())
            {
                this.campaign = Campaigns.findOne({_id : this.id});
                this.pendingInvites = this.campaign.pendingInvites;
            }
            if(sub2.ready())
            {
                this.characters = Characters.find({ $and: [ { campaignID: { $eq: this.id } }, { UID: { $ne: "npc" } } ] }).fetch();
                this.NPCs = Characters.find({ $and: [ { campaignID: { $eq: this.id } }, { UID: { $eq: "npc" } } ] }).fetch();
            }
            if(sub3.ready())
            {
                this.users = Meteor.users.find({}).fetch();
            }
            this.forceUpdate();
        });
    }

    componentWillUnmount(){
        this.campaignSheetTracker.stop();
    }
    
    renderNPCs() {
        var cards = [];
        if (this.NPCs){
            for (var i = 0; i < this.NPCs.length; i++)
            {
                cards.push(<CharacterCardMini key={i} characterImageURL={this.NPCs[i].characterImageURL} id={this.NPCs[i]._id} somehistory={this.props.history} func={this.loadNPC} characterName={this.NPCs[i].characterName} characterClass={this.NPCs[i].characterClass} level={this.NPCs[i].level} race={this.NPCs[i].race}/>);
            }
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
        if (this.characters){
            for (var i = 0; i < this.characters.length; i++)
            {
                cards.push(<CharacterCardMiniWithOwner key={i} character={this.characters[i]}/>);
            }
        }

        if (this.pendingInvites){
            for (var i = 0; i < this.pendingInvites.length; i++)
            {
                //cards.push(<CharacterCardMiniWithOwner key={i} character={this.pendingInvites[i]}/>);
            }
        }
        return <div>{cards}</div>;
    }

    renderTextAssets() {
        var cards = [];
        for (var i = 0; i < this.campaign.notes.length; i++)
        {
            cards.push(<TextAssetcard key={i} noteTitle={this.campaign.notes[i][0]} noteDescription={this.campaign.notes[i][1]} id={this.campaign._id}/>);
        }
        return <div>{cards}</div>;
    }

    insertTextAssets(newTitle, newNote) {
        var notes = [newTitle, newNote]//null;//{title=newTitle,note=newNote};
        Meteor.call("campaignNote.push", 
            _id = this.id,
            notes,    
        );
        this.refs.newNoteTitle.value = "";
        this.refs.newNoteText.value = "";
    }

    addPlayer(userID) {
        Meteor.call("campaignPendingInvites.addToSet", 
            _id = this.id,
            userID,    
        );
        this.togglePlayerPopup();
    }
    
    updateTextAssets(){
        console.log("fix this mike");
    }

    renderImageAssets() {
        var cards = [];
        for (var i = 0; i < this.campaign.URLs.length; i++)
        {
            cards.push(<ImageAssetCard key={i} URL={this.campaign.URLs[i]} _id ={this.id} campaignID={this.campaign._id}/>);
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
        var name = this.refs.campaignTitle.value;
        var description = this.refs.campaignDescription.value;
        var campaignImageURL = this.refs.campaignImageURL.value;
        
        Campaigns.update({
            _id : this.id},{
                $set:{
                    name, 
                    description, 
                    campaignImageURL}
            }
        );
    }

    addImageAsset(url){
        //newURL = this.refs.imageUrlBox.value;
        newURL = url;
        urlExists = Campaigns.find({ URLs: { $elemMatch: { $eq: newURL}}}).fetch().length > 0;

        if(newURL == "")
        {
            return;
        }

        if (urlExists){
            alert("URL is already an asset.");
        }
        else{
            Meteor.call("campaignImage.addToSet", 
                this.id,
                newURL,    
            );
        }
        this.toggleImagePopup();
    }

    addToAdventureBoard(){
        Meteor.call('makeCampaignPublic', this.id);
    }

    removeFromAdventureBoard(){
        Meteor.call('makeCampaignPrivate', this.id);
    }

    loadNPC(cid, somehistory){
        console.log("this hit");
        if (!cid)
        {
            console.log("this hit2");
            cid = Random.id();
            Meteor.call('characters.insert', cid, this.campaign._id, 'npc');
        }

        if (!somehistory){
            somehistory = this.props.history;
        }

        somehistory.push('/character/edit/' + cid);
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
                                <textarea rows={10} ref="campaignDescription" defaultValue={this.campaign.description != null ? this.campaign.description : ""} className="fill-width"/>
                            </div>

                            <div className="spacer col-sm-12"/>                      
                            <div className="spacer col-sm-12"/>
                            <div className="spacer col-sm-12"/>                      
                            <div className="spacer col-sm-12"/>

                            <h3>NPCs</h3>
                            <hr/>
                            <div className=" height-600 scrolling-container">
                                {this.renderNPCs()}

                                <NavLink to='#' onClick={() => this.loadNPC()} className='nav-item nav-link'>   
                                    <div className="objectCardMini add-container grow">
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
                                        <div className="textAssetMini add-container">
                                            <div onClick={() => this.insertTextAssets(this.refs.newNoteTitle.value, this.refs.newNoteText.value)} className="textCardMiniImage">
                                                <img src={'/images/addIcon.png'} className="stretch-image"/>
                                            </div>
                                            <div className="col-xs-5">
                                                <input className="full-width" type="text" ref="newNoteTitle" placeholder=""/>
                                            </div>
                                            <div className="col-xs-10">
                                                <textarea rows={3} ref="newNoteText" defaultValue={this.campaign.description != null ? this.campaign.description : ""} className="fill-width"/>
                                                
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

                                <div className="add-image-card rid-item add-container">
                                    <img onClick={this.toggleImagePopup.bind(this)} src={'/images/addIcon.png'} className="stretch-image"/>
                                    
                                </div>
                            </div>

                            <div className="spacer col-sm-12"/>                      
                            <div className="spacer col-sm-12"/>
                            <div className="spacer col-sm-12"/>                      
                            <div className="spacer col-sm-12"/>

                            


                        </div> 

                        
                        <div className="col-lg-4">



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
                                <div onClick={this.togglePlayerPopup.bind(this)} className='nav-item nav-link'> 
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
                            <div className="spacer col-sm-12"/> 
                            <div className="spacer col-sm-12"/>
                                              

                            <div className="col-sm-12">
                                <NavLink to={'/campaigns/' + this.campaign._id} className='nav-item nav-link'><button className="full-width submit-button blue-button">ENTER CAMPAIGN</button></NavLink>
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
                                <button onClick={this.deleteCampaign.bind(this)} className="full-width submit-button">DELETE CAMPAIGN</button>
                            </div>  
                            <div className="spacer col-sm-12"/>
                            <div className="spacer col-sm-12"/>                      
                            <div className="spacer col-sm-12"/>
                            <div className="col-sm-12">
                                <button onClick={this.addToAdventureBoard.bind(this)} className="full-width submit-button blue-button">ADD TO ADVENTURE BOARD</button>
                            </div>
                            <div className="spacer col-sm-12"/>
                            <div className="col-sm-12">
                                <button onClick={this.removeFromAdventureBoard.bind(this)} className="full-width submit-button ">REMOVE FROM ADVENTURE BOARD</button>
                            </div>
                            
                        </div>
                        {this.state.showImagePopup ? 
                            <ImagePopup
                                text='Close Me'
                                closePopup={this.toggleImagePopup.bind(this)}
                                addImageAsset={this.addImageAsset.bind(this)}
                            />
                            : null
                            }
                        {this.state.showPlayerPopup ? 
                            <PlayerPopup
                                text='Close Me'
                                closePopup={this.togglePlayerPopup.bind(this)}
                                addPlayer={this.addPlayer.bind(this)}
                                pendingInvites={this.pendingInvites}
                                characters={this.characters}
                            />
                            : null
                            }
                        
                    </div>
                </div>

            </div>
    );
  }
}