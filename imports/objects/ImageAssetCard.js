import React from 'react'

export default class ImageAssetCard extends React.Component{
    deleteImage(){
        console.log("delete image");
        Meteor.call("campaignImage.pull", this.props._id, this.props.URL);
    }

    render() {
        return (
            <div className="image-card">
                <div className="image-asset">
                    <img src={this.props.URL == null || this.props.URL == "" ? '/images/addIcon.png' : this.props.URL} className="image-asset-img" />
                    <div onClick={this.deleteImage.bind(this)}/>>
                    <p>DELETE</p>
                </div>
            </div>
        );
    }
}