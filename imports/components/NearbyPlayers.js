import React from 'react'
import Header from './Header';


import PlayerNearYou from '../objects/PlayerNearYou';

export default class NearbyPlayers extends React.Component{
  render() {
    return(
        <div className="page-wrapper">
            <Header/>        
            <div className="col-xs-12">
                <div className="col-sm-8 col-sm-offset-2 ">
                    <div className=" page-content col-sm-12">
                            
                        <div className="col-sm-4 split-page-left container">
                                <h3>Players Nearby >></h3>
                            <hr className="hr-thicc"/>
                            <div className="scrolling-container negate-vertical-margins">
                                <PlayerNearYou/>
                                <PlayerNearYou/>
                                <PlayerNearYou/>
                                <PlayerNearYou/>
                                <PlayerNearYou/>
                                <PlayerNearYou/>                    
                                <PlayerNearYou/>
                                <PlayerNearYou/>
                                <PlayerNearYou/>
                                <PlayerNearYou/>
                                <PlayerNearYou/>
                                <PlayerNearYou/>
                            </div>
                        </div>

                        <div className="col-sm-8 split-page-right left-border container">
                                <h3>Meeting Spots >></h3>

                            <hr className="hr-thicc"/>
                            <iframe
                                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCqtGWum15tt9hxNTKPbpv98Sc184aWwCQ&q=Space+Needle,Seattle+WA" className="fill-width fill-height"
                                />
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}  