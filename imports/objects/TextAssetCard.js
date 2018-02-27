import React from 'react'

export default class TextAssetcard extends React.Component{
    deleteAsset(){
        notes = [this.props.noteTitle, this.props.noteDescription]//null;//{title=newTitle,note=newNote};
        Meteor.call("campaignNote.pull", 
            _id = this.props.id,
            notes,    
        );   
    }
    render() {
        return (
            <div className="textAssetMini">
                <div className="objectCardMiniInfo container-fluid full-width">
                    <p className="p-override no-margin-override small-text full-width"> {this.props.noteTitle}  {this.props.noteDescription}</p>
                    <button onClick={this.deleteAsset.bind(this)} className="delete-txt-btn full-width">Delete</button>
                </div>
            </div>
        );
    }
}