import React from 'react'

import SettingsForm from '../objects/SettingsForm';

import { reverseGeocode } from 'meteor/jaymc:google-reverse-geocode';

import Header from './Header';

var user;

export default class Settings extends React.Component{

    componentWillMount(){
        //id = this.props.match.params._id;
        id=Meteor.userId;
        this.settingsTracker = Tracker.autorun(() => {
            const sub = Meteor.subscribe('userData');
            if(sub.ready())
            {
                this.user = Meteor.users.findOne({_id : id});
            }
            this.forceUpdate();
        });
    }

    componentWillUnmount(){
        this.settingsTracker.stop();
    }

    renderForm(){
        if(this.user == null)
        {
            return;
        }
        else
        {
            return(<SettingsForm user={this.user}/>);
        }
    }


  render() {
    return(
        <div className="col-xs-12">
        <Header/>
            <div className="col-sm-8 col-sm-offset-2 ">
                <div className=" page-content col-sm-12">
                    {this.renderForm()}
                </div>
            </div>
        </div>
            
    );
  }
}  