import React from 'react';

export default class CampaignCardVertical extends React.Component {
    render() {
        return (
            <div className="vertical-character-card col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <div className="vertical-character-card-contents">
                    <div className="vertical-character-image">
                        <img src={'/images/photoMissing.png'} className="full-width vertical-character-image"/>
                    </div>
                    <div className="vertical-character-data">
                        <h3>Elfman NeedsAName</h3>
                        <hr className="hr-override full-width"/>
                        <p className="p-override"> Class: Druid</p>
                        <p className="p-override"> Level: 4</p>
                        <p className="p-override"> Race: Elf</p>
                    </div>
                </div>
            </div>
        );
    }
}