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
        console.log("campaignWillMount");
        this.campaignSheetTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('campaigns');
            console.log("campaignTracker");
            console.log(sub.ready());
            if(sub.ready())
            {
                this.campaign = Campaigns.findOne({_id : this.id});
                console.log("campaignSubReady");
                console.log(this.id);
                console.log(this.campaign); 
                this.forceUpdate();               
            }
            console.log("end");
            
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
            console.log("randomizing");
            characterID = Random.id();
        }

        console.log(characterID);
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
        var numcharacters = 8;
        for (var i = 0; i < numcharacters; i++)
        {
            cards.push(<TextAssetcard key={i}/>);
        }
        return <div>{cards}</div>;
    }

    insertTextAssets(newTitle, newNote) {
        notes = [newTitle, newNote]//null;//{title=newTitle,note=newNote};

        Meteor.call("campaigns.push", 
            _id = this.id,
            notes,    
        );
    }
    
    updateTextAssets(){
        console.log("fix this mike");
    }

    renderImageAssets() {
        var cards = [];
        var numcharacters = 8;
        for (var i = 0; i < numcharacters; i++)
        {
            cards.push(<ImageAssetCard key={i}/>);
        }
        return <div>{cards}</div>;
    }

    render() {
        return(
            <div className="page-wrapper">
                <div className="col-lg-8 col-lg-offset-2">
                    <div className="page-content col-xs-12 fill-height scrolling-container" >
                        <div className="col-lg-8">
                            <h3>Campaign Title</h3>
                                <hr/>
                                <div className="scrolling-container">
                                    <input type="text" className="fill-width"/>
                                </div>

                                <div className="spacer col-sm-12"/>                      
                                <div className="spacer col-sm-12"/>
                                <div className="spacer col-sm-12"/>                      
                                <div className="spacer col-sm-12"/>
                                
                            <h3>Campaign Description</h3>
                            <hr/>
                            <div className="scrolling-container">
                                <input type="text" style={{"height":"150px"}} className="fill-width"/>
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
                            </div>

                            <div className="spacer col-sm-12"/>                      
                            <div className="spacer col-sm-12"/>
                            <div className="spacer col-sm-12"/>                      
                            <div className="spacer col-sm-12"/>

                            <h3>Image Assets</h3>
                            <hr/>
                            <div className="flex-grid container-fluid">
                                {this.renderImageAssets()}

                                <NavLink to='#' onClick={() => this.loadCharacter()} className='nav-item nav-link'>   
                                    <div className="objectCardMini grid-item add-container">
                                        <img src={'/images/addIcon.png'} className="stretch-image"/>
                                    </div>
                                </NavLink>
                            </div>


                        </div> 

                        
                        <div className="col-lg-4">
                            <h3>Campaign Image</h3>
                            <hr/>
                            <img src= '/images/photoMissing.png' className="full-width"/>
                            <div className="spacer col-sm-12"/>

                            <div className="col-sm-12">
                                <p className="p-override">IMAGE URL</p>
                                <input className="full-width" type="text" ref="characterImageURL" defaultValue= ""/>
                            </div>

                            <div className="spacer col-sm-12"/>                      
                            <div className="spacer col-sm-12"/>
                            <div className="spacer col-sm-12"/>                      
                            <div className="spacer col-sm-12"/>

                            <h3>Player List >></h3>
                            <hr/>
                            <div className="scrolling-container">
                                {this.renderPlayers()}

                                <NavLink to='#' onClick={() => this.loadCharacter()} className='nav-item nav-link'>   
                                    <div className="objectCardMini add-container">
                                        <div className="objectCardMiniImage">
                                            <img src={'/images/addIcon.png'} className="stretch-image"/>
                                        </div>
                                        <div className="objectCardMiniInfo container-fluid">
                                            <h5 className="no-margin-override overflow-hidden">ADD NEW PLAYER</h5>
                                            <hr className="hr-override-light"/>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>
    );
  }
}