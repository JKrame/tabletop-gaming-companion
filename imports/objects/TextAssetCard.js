import React from 'react'

export default class TextAssetcard extends React.Component{
    deleteAsset(){
        notes = [this.props.noteTitle, this.props.noteDescription]//null;//{title=newTitle,note=newNote};
        Meteor.call("campaignNote.pull", 
            _id = this.props.id,
            notes,    
        );   
    }

    nothing()
    {
        return;
    }

    render() {
        return (
            <div className="textAssetMini" onClick={this.props.func ? () => this.props.func(this.props.noteTitle, this.props.noteDescription) : this.nothing()}>
                <div className="objectCardMiniInfo container-fluid full-width">

                    <p className="text-asset-txt p-override no-margin-override small-text full-width"> <strong className="title">{this.props.noteTitle}</strong>  {this.props.noteDescription}</p>
                    <div className={this.props.isCampaignScreen ? "" : "text-image-buttons"}>
                        <button onClick={this.props.isCampaignScreen ? this.nothing() : this.deleteAsset.bind(this)} className="tiny-delete-btn">
                            <p  className="tiny-button-txt"><img src={'/images/x-icon.png'} className=""/>  DELETE</p>
                        </button>
                    </div>
                       

                </div>
            </div>
        );
    }
}