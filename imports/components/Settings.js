import React from 'react'

import { Geolocation } from 'meteor/mdg:geolocation';
import { reverseGeocode } from 'meteor/jaymc:google-reverse-geocode';

export default class Settings extends React.Component{

    constructor(init){
        super(init);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleScheduleChange = this.handleScheduleChange.bind(this);
    }

    componentWillMount(){
        id = Meteor.userId();
        console.log(id)
        this.settingsTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('users');
            if(sub.ready())
            {
                console.log("ready")
                this.user = users.findOne({_id : this.id});               
            }
            this.forceUpdate();
        });
    }

    componentWillUnmount(){
        this.settingsTracker.stop();
    }

    onSubmit(e){  
        e.preventDefault();
        //console.log(this.refs.Monday.checked)
        // if(this.refs.location.checked){
        //     this.setLocation()
        // }
        schedule = [this.refs.Monday.checked, this.refs.Tuesday.checked, this.refs.Wednesday.checked, this.refs.Thursday.checked, this.refs.Friday.checked, this.refs.Saturday.checked, this.refs.Sunday.checked]
        Meteor.users.update(Meteor.userId(), {
            $set: {"profile.schedule": schedule}
        });
        console.log(schedule)
    }




    handleScheduleChange({target}){
        if (target.checked){
            Meteor.users.update(Meteor.userId(), {
                $addToSet: {"profile.schedule": target.value}
            });

        } else{
            Meteor.users.update(Meteor.userId(), {
                $pull: {"profile.schedule": target.value}
            });
        }
    }

    handleLocationChange({target}){
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
                        <form onSubmit={this.onSubmit.bind(this)}>
                            <div className="scrolling-container-smaller">
                                <div className="col-sm-12">
                                    <p className="p-override">NAME</p>
                                    <input className="full-width" type="text" ref="characterName" />
                                </div>
                            <div className="spacer col-sm-12"/>
                                <div className="col-sm-12">
                                    <p className="p-override">Location</p>
                                    <input id={this.id} type="checkbox" value="test" ref="location"/>
                                    <label htmlFor={this.id}> Opt in</label>
                                </div>                        
                            <div className="spacer col-sm-12"/>
                                <div className="col-sm-12">
                                    <p className="p-override">Available Game Days</p>
                                    <input id={this.id} type="checkbox" defaultChecked={Meteor.user()? Meteor.user().profile.schedule[0] : false} value="Monday" ref="Monday" />
                                    <label htmlFor={this.id}> Monday</label>
                                    <input id={this.id} type="checkbox" defaultChecked={Meteor.user() ? Meteor.user().profile.schedule[1] : false} value="Tuesday" ref="Tuesday"/>
                                    <label htmlFor={this.id}> Tuesday</label>
                                    <input id={this.id} type="checkbox" defaultChecked={Meteor.user() ? Meteor.user().profile.schedule[2] : false} value="Wednesday" ref="Wednesday"/>
                                    <label htmlFor={this.id}> Wednesday</label>
                                    <input id={this.id} type="checkbox" defaultChecked={Meteor.user()? Meteor.user().profile.schedule[0] : false} value="Thursday" ref="Thursday"/>
                                    <label htmlFor={this.id}> Thursday</label>
                                    <input id={this.id} type="checkbox" defaultChecked={Meteor.user()? Meteor.user().profile.schedule[0] : false} value="Friday" ref="Friday"/>
                                    <label htmlFor={this.id}> Friday</label>
                                    <input id={this.id} type="checkbox" defaultChecked={Meteor.user()? Meteor.user().profile.schedule[0] : false} value="Saturday" ref="Saturday" />
                                    <label htmlFor={this.id}> Saturday</label>
                                    <input id={this.id} type="checkbox" defaultChecked={Meteor.user()? Meteor.user().profile.schedule[0] : false} value="Sunday" ref="Sunday" />
                                    <label htmlFor={this.id}> Sunday</label>
                                    
                                </div>                        
                            <div className="spacer col-sm-12"/>
                                <div className="col-sm-12">
                                    <p className="p-override">NAME</p>
                                    <input className="full-width" type="text" ref="characterNames" />
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
                            <div className="col-sm-12">
                                <button className="full-width submit-button blue-button">SUBMIT CHANGES</button>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
            
    );
  }
}  