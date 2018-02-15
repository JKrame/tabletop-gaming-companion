import React from 'react'

import { Geolocation } from 'meteor/mdg:geolocation';
import { reverseGeocode } from 'meteor/jaymc:google-reverse-geocode';

export default class Settings extends React.Component{
    
    constructor(init){
        super(init);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange({target}){
        if (target.checked){
            this.setLocation.call()
            console.log("checked")
            //target.removeAttribute('checked');
            
        } else {
            console.log("unchecked")
            //target.setAttribute('checked', true);

        }
    }

    setLocation() {
        var latLng = new ReactiveVar();
        Tracker.autorun(function(computation) {
            latLng.set(Geolocation.latLng());
            if (latLng.get()) {
                console.log(latLng)
                computation.stop();
                var lat = latLng.curValue.lat;
                var lng = latLng.curValue.lng;
                reverseGeocode.getSecureLocation(lat, lng, function(location) {
                    Meteor.users.update(Meteor.userId(), {
                        $set: {"profile.location": reverseGeocode.getAddrStr()}
                    });
                });
            }
        })
    }


  render() {
    return(
        <div className="col-xs-12">
            <div className="col-sm-8 col-sm-offset-2 ">
                <div className=" page-content col-sm-12">
                        
                    <div className="col-sm-4 split-page-left container">
                        <img  className="full-width" src={'/images/photoMissing.png'}/>
                        <div className="spacer col-sm-12"/>

                            <div className="col-sm-12">
                                <p className="p-override">IMAGE URL</p>
                                <input className="full-width" type="text" ref="characterImageURL" />
                            </div>
                            <div className="spacer col-sm-12"/>
                            <div className="spacer col-sm-12"/>
                            <div className="spacer col-sm-12"/>

                            <div className="col-sm-12">
                                <button className="full-width submit-button blue-button">SUBMIT CHANGES</button>
                            </div>
                    </div>

                    <div className="col-sm-8 split-page-right left-border container">
                        <form >
                            <div className="scrolling-container-smaller">
                                <div className="col-sm-12">
                                    <p className="p-override">NAME</p>
                                    <input className="full-width" type="text" ref="characterName" />
                                </div>
                            <div className="spacer col-sm-12"/>
                                <div className="col-sm-12">
                                    <p className="p-override">Location</p>
                                    <input
                                    id={this.id}
                                    type="checkbox"
                                    value="test"
                                    ref="complete"
                                    onChange={this.handleChange}
                                    />
                                    <label htmlFor={this.id}> Opt in</label>
                                </div>                        
                            <div className="spacer col-sm-12"/>
                                <div className="col-sm-12">
                                    <p className="p-override">NAME</p>
                                    <input className="full-width" type="text" ref="characterName" />
                                </div>                        
                            <div className="spacer col-sm-12"/>
                                <div className="col-sm-12">
                                    <p className="p-override">NAME</p>
                                    <input className="full-width" type="text" ref="characterName" />
                                </div>                        
                            <div className="spacer col-sm-12"/>
                                <div className="col-sm-12">
                                    <p className="p-override">NAME</p>
                                    <input className="full-width" type="text" ref="characterName" />
                                </div>                       
                            <div className="spacer col-sm-12"/>
                                <div className="col-sm-12">
                                    <p className="p-override">NAME</p>
                                    <input className="full-width" type="text" ref="characterName" />
                                </div>                       
                            <div className="spacer col-sm-12"/>
                                <div className="col-sm-12">
                                    <p className="p-override">NAME</p>
                                    <input className="full-width" type="text" ref="characterName" />
                                </div>                       
                            <div className="spacer col-sm-12"/>
                                <div className="col-sm-12">
                                    <p className="p-override">NAME</p>
                                    <input className="full-width" type="text" ref="characterName" />
                                </div>
                                
                                <div className="spacer col-sm-12"/>
                                <div className="spacer col-sm-12"/>
                                <div className="spacer col-sm-12"/>
                                <div className="spacer col-sm-12"/>


                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
            
    );
  }
}  