import React from 'react'

export default class ImageAssetCard extends React.Component{
    render() {
        return (
            <div className="objectCardMini grid-item split-page-left">
                <img src={'/images/addIcon.png'} className="stretch-image"/>
            </div>
        );
    }
}