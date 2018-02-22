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
            <div className="objectCardMini">
                <div className="objectCardMiniInfo container-fluid">
                    <p className="p-override no-margin-override small-text"> {this.props.noteTitle}  {this.props.noteDescription}</p>
                    <div onClick={this.deleteAsset.bind(this)}>
                        <p>DELETE</p>
                    </div>
                </div>
            </div>
        );
    }
}