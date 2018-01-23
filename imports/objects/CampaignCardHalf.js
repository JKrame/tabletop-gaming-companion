import React from 'react'

export default class CampaignCardHalf extends React.Component{
    render() {
        return (
            <div className="objectCardHalf">
                <div className="objectCardHalfImage">
                    <img src={'/images/placeholder.jpg'}/>
                </div>
                <div className="objectCardHalfInfo container-fluid">
                    <h4>CampaignName</h4>
                    <hr className="hr-override container-fluid"/>
                    <p className="p-override"> Campaign Description...</p>
                </div>
            </div>
        );
    }
}