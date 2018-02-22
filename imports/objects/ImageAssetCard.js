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
            <div className="image-card" onClick={() => this.props.onClick(this.props.popupStyle)}>
                <div className="image-asset">
                    <img src={this.props.URL == null || this.props.URL == "" ? '/images/addIcon.png' : this.props.URL} className="image-asset-img" />
                    <div onClick={this.deleteImage.bind(this)}>
                        <p>DELETE</p>
                    </div>
                </div>
            </div>
        );
    }
}