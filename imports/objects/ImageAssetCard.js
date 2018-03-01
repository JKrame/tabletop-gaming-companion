import React from 'react'

export default class ImageAssetCard extends React.Component{
    deleteImage(){
        Meteor.call("campaignImage.pull",
            _id = this.props.campaignID,
            imageURL = this.props.URL
        );
    }

    render() {
        return (
            <div className="image-card">
                <div className="image-asset">
                    <img src={this.props.URL == null || this.props.URL == "" ? '/images/addIcon.png' : this.props.URL} className="image-asset-img" />                    
                </div>
                <div className="image-buttons">

                    <button onClick={this.deleteImage.bind(this)} className="tiny-delete-btn">
                        <p  className="tiny-button-txt"><img src={'/images/x-icon.png'} className=""/>  DELETE</p>
                    </button>

                </div>
            </div>
        );
    }
}