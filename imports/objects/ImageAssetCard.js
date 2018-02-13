import React from 'react'

export default class ImageAssetCard extends React.Component{
    render() {
        return (
            <div className="objectCardMini grid-item split-page-left">
                <img src={this.props.URL = null || this.props.URL == "" ? '/images/addIcon.png' : this.props.URL} className="stretch-image"/>
            </div>
        );
    }
}