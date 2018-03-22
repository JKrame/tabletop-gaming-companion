import React from 'react'

export default class ImageAssetCard extends React.Component{
    deleteImage(){
        Meteor.call("campaignImage.pull",
            _id = this.props.campaignID,
            imageURL = this.props.URL
        );
    }

    nothing()
    {
        return;
    }

    render() {
        return (
            <div className="image-card" onClick={this.props.func ? () => this.props.func(this.props.URL) : this.nothing()} draggable="false">
                <div className="image-asset">
                    <img src={this.props.URL == null || this.props.URL == "" ? '/images/addIcon.png' : this.props.URL} className="image-asset-img"  draggable="false"/>                    
                </div>
                <div className={this.props.isCampaignScreen ? "" : "image-buttons"}>
                    <button onClick={this.props.isCampaignScreen ? this.nothing() : this.deleteImage.bind(this)} className="tiny-delete-btn">
                        <p  className="tiny-button-txt"><img src={'/images/x-icon.png'} className=""/>  DELETE</p>
                    </button>
                </div>
            </div>
        );
    }
}