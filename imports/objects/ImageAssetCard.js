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
            <div className="image-card" onClick={this.props.func ? () => this.props.func(this.props.URL) : this.nothing()}>
                <div className="image-asset">
                    <img src={this.props.URL == null || this.props.URL == "" ? '/images/addIcon.png' : this.props.URL} className="image-asset-img" />
                    <button onClick={this.deleteImage.bind(this)} className="delete-btn full-width">Delete</button>
                </div>
            </div>
        );
    }
}