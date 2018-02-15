import React from 'react'
import { NavLink } from 'react-router-dom';
import CharacterCardMini from '../objects/CharacterCardMini';
import CharacterCardHalf from '../objects/CharacterCardHalf';
import TextAssetcard from '../objects/TextAssetCard';
import ImageAssetCard from '../objects/ImageAssetCard';
import UserCardMini from '../objects/UserCard';

var name;
var description;
var meetTime;
var meetDate;
var players;
var gm;
var notes;
var turnOrder;
var URLs;

var popupStyle = {
    display: 'none'
};

export default class CampaignSetup extends React.Component{

    componentWillMount(){
        this.id = this.props.match.params._id;
        this.campaignSheetTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('campaigns');
            const sub2 = Meteor.subscribe('users');
            if(sub.ready())
            {
                this.campaign = Campaigns.findOne({_id : this.id});               
            }
            this.forceUpdate();
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

    renderContacts() {
        var cards = [];
        var numcharacters = 12;
        for (var i = 0; i < numcharacters; i++)
        {
            cards.push(<UserCardMini key={i}/>);
        }
        return <div>{cards}</div>;
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
        this.refs.newNoteTitle.value = "";
        this.refs.newNoteText.value = "";
    }

    addPlayer(username) {
        // if(!Meteor.users.findOne({"emails.address" : username}))
        // {
        //     alert(username + " does not exist.");
        //     return;
        // }

        Meteor.call("campaignPlayer.push", 
            _id = this.id,
            username,    
        );

        this.refs.addplayer.value = "";
    }
    
    updateTextAssets(){
        console.log("fix this mike");
    }

    renderImageAssets() {
        var cards = [];
        for (var i = 0; i < this.campaign.URLs.length; i++)
        {
            cards.push(<ImageAssetCard key={i} URL={this.campaign.URLs[i]} _id ={this.id}/>);
        }
        //cards.push(<ImageAssetCard key={this.campaign.URLs.length + 1} popupStyle={this.popupStyle} onClick={this.makeVisibleAddImageAsset} URL={this.campaign.URLs[this.campaign.URLs.length + 1]} _id ={this.id}/>);
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

    makeVisibleAddImageAsset()
    {   //ugh ive completely run out of ideas
        this.popupStyle = {
            display : 'visible'
        };
        this.render();
        // this.setState(this.state);
        // this.forceUpdate();
        //forceUpdate();
        // return (
        //     <div className="add-image-popup">
        //         <h2>Enter the Image URL</h2>
        //         <input type="text" className="full-width"/>
        //         <div className="col-sm-12">
        //             <div className="right-align">
        //                 <button className=" submit-button button">Cancel</button>
        //                 <button className="submit-button blue-button button">Add Image</button>
        //             </div>
        //         </div>
        //     </div>
        // );
        console.log("calling some bullshit");
    }

    addImageAsset(){
        newURL = this.refs.newImageURL.value;
        urlExists = Campaigns.find({ URLs: { $elemMatch: { $eq: newURL}}}).fetch().length > 0;

        console.log(urlExists);

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
                this.refs.newImageURL.value,    
            );
        }
        this.refs.newImageURL.value = "";
    }

    render() {
        if (this.campaign == null){
            return (<div></div>);
        }

        return(
            <div className="page-wrapper">

                <div className="add-image-popup" style={popupStyle}>
                    <h2>Enter the Image URL</h2>
                    <input type="text" className="full-width"/>
                    <div className="col-sm-12">
                        <div className="right-align">
                            <button className=" submit-button button">Cancel</button>
                            <button className="submit-button blue-button button">Add Image</button>
                        </div>
                    </div>
                </div>

                <div className="add-player-popup">
                    <h2>Enter Player Username</h2>
                    <input type="text" className="full-width"/>
                    <div className="col-sm-12">
                        <div className="right-align">
                            <button className=" submit-button button">Cancel</button>
                            <button className="submit-button blue-button button">Add Player</button>
                        </div>
                    </div>
                    
                    <div className="spacer col-sm-12"/>                      
                            <div className="spacer col-sm-12"/>
                    <h4>Or select from Contacts</h4>
                    <div className="full-height">
                        <div className="scrolling-container">
                            {this.renderContacts()}
                        </div>
                    </div>

                </div>

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

                                <div className="image-card" onClick={() => this.makeVisibleAddImageAsset()}>
                                    <div className="image-asset">
                                        <img src='/images/addIcon.png' className="image-asset-img" />
                                    </div>
                                </div>
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
                                </div>
                                <div onClick={() => this.addPlayer(this.refs.addplayer.value)} className='nav-item nav-link'> 
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