import React from 'react'

export default class ImageAssetCard extends React.Component{
    deleteImage(){
        console.log("delete image");
        Meteor.call("campaignImage.pull", this.props._id, this.props.URL);
    }

    render() {
        return (
            <div className="objectCardMini grid-item split-page-left">
                <img src={this.props.URL = null || this.props.URL == "" ? '/images/addIcon.png' : this.props.URL} className="stretch-image"/>
                <div onClick={this.deleteImage.bind(this)}>
                    <p>DELETE</p>
                </div>
            </div>
        );
    }
}