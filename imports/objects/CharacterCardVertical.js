import React from 'react';

export default class CampaignCardVertical extends React.Component {
    render() {
        return (
            <div className="vertical-card col-lg-3 col-md-4 col-sm-6 col-xs-12 highlight-container">
                <div className="vertical-card-contents">
                    <div className="vertical-image">
                        <img src={'/images/photoMissing.png'} className="full-width vertical-image"/>
                    </div>
                    <div className="vertical-data">
                        <h3>Elfman NeedsAName</h3>
                        <hr className="hr-override-light"/>
                        <p className="p-override"> Class: Druid</p>
                        <p className="p-override"> Level: 4</p>
                        <p className="p-override"> Race: Elf</p>
                    </div>
                </div>
            </div>
        );
    }
}