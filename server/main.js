import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import '../imports/api/users';
import '../imports/api/character';
    
Meteor.startup(() => {
    console.log("startin up");
});
