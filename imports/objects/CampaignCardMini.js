import React from 'react'

export default class CampaignCardMini extends React.Component{
    render() {
        return (
            <div className="objectCardMini highlight-container">
                <div className="objectCardMiniImage">
                    <img src={'/images/placeholder.jpg'} className="stretch-image"/>
                </div>
                <div className="objectCardMiniInfo container-fluid">
                    <h5 className="no-margin-override h5-overflow-hidden">CampaignName</h5>
                    <hr className="hr-override-light"/>
                    <p className="p-override no-margin-override small-text"> Campaign Description...</p>
                </div>
            </div>
        );
    }
}