import React from 'react'

export default class CampaignCardHalf extends React.Component{
    render() {
        return (
            <div className="objectCardHalf">
                <div className="objectCardHalfImage">
                    <img src={'/images/placeholder.jpg'} className="stretch-image"/>
                </div>
                <div className="objectCardHalfInfo">
                    <h4 className="no-margin-override">CampaignName</h4>
                    <hr className="hr-override-light" style={{"marginLeft":"100px", "marginRight":"10px"}}/>
                    <p className="p-override no-margin-override"> Campaign Description...</p>
                </div>
            </div>
        );
    }
}