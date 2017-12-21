import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import '../imports/api/users';
    
Meteor.startup(() => {
    console.log("startin up");
});
