import React from 'react'

export default class ImageAssetCard extends React.Component{
    render() {
        return (
            <div className="image-card">
                <div className="image-asset">
                    <img src={this.props.URL == null || this.props.URL == "" ? '/images/addIcon.png' : this.props.URL} className="image-asset-img" />
                </div>
            </div>
        );
    }
}