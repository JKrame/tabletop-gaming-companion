import React from 'react'
import Header from './Header';


import PlayerNearYou from '../objects/PlayerNearYou';

export default class NearbyPlayers extends React.Component{
    componentWillMount(){
        this.homeTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('userData');
            var UID = Meteor.userId();
            if(sub.ready()){
                this.user = Meteor.users.find({}).fetch();
            }
            this.forceUpdate();
        });
    }

    PlayersNearYou(){
        var cards = [];
        var currUserLocation=null
        var userLocation=null
        //console.log(this.user)
        if(this.user==undefined){
            return;
        }  
        //checks for user location
        for(var i=0;i<this.user.length;i++){
            if(this.user[i]._id == Meteor.userId()){
                if(this.user[i].profile.location == null){
                    return;
                }
                currUserLocation=this.user[i].profile.location;
                //console.log(currUserLocation)
            }
        }
        //gets all other locations
        for(var i=0;i<this.user.length;i++){
            if(this.user[i]._id != Meteor.userId()){
                //console.log(Meteor.userId())

                if(this.user[i].profile.location == null){
                    return;
                }
                userLocation=this.user[i].profile.location;
                //console.log(this.user[i].profile.username)
            }
            if(currUserLocation && userLocation != null)
            {
                
                distance = geolib.getDistance(
                    {latitude: currUserLocation[0], longitude: currUserLocation[1]},
                    {latitude: userLocation[0], longitude: userLocation[1]}
                );
                //console.log(distance)
                //30 miles
                if (distance<48280){
                    //console.log("hit")
                    
                    cards.push(
                        <PlayerNearYou
                            key={i}
                            somehistory={this.props.history}
                            username={this.user[i].profile.username}
                        />
                    );
                
                }
                return <div>{cards}</div>;
            }
        }
    }

  render() {
    return(
        <div className="page-wrapper">
            <div className="col-xs-12">
                <div className="col-sm-8 col-sm-offset-2 ">
                    <div className=" page-content col-sm-12">
                            
                        <div className="col-sm-4 split-page-left container">
                                <h3>Players Nearby</h3>
                            <hr className="hr-thicc"/>
                            <div className="scrolling-container negate-vertical-margins">
                                {this.PlayersNearYou()}
                            </div>
                        </div>

                        <div className="col-sm-8 split-page-right left-border container">
                                <h3>Meeting Spots</h3>

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