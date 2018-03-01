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

                    <p className="text-asset-txt p-override no-margin-override small-text full-width"> <strong className="title">{this.props.noteTitle}</strong>  {this.props.noteDescription}</p>
                    <div className="text-image-buttons">
                        <button onClick={this.deleteAsset.bind(this)} className="tiny-delete-btn">
                            <p  className="tiny-button-txt"><img src={'/images/x-icon.png'} className=""/>  DELETE</p>
                        </button>
                    </div>
                       

                </div>
            </div>
        );
    }
}