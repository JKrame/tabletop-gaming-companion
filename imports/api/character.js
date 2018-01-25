import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export var Characters = new Meteor.Collection('characters');

console.log("characters.js")
if (Meteor.isServer) {
    console.log("serverside");
    Meteor.publish("characters", function(){
        console.log("publish plz");
        Characters.find({})
    });
  }


