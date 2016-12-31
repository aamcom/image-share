import { Meteor } from 'meteor/meteor';

Images = new Mongo.Collection('images');

console.log('main.js (server) says -  nb images : ' + Images.find().count());


Meteor.startup(() => {
  // code to run on server at startup
  

  if (Meteor.isClient) {
    console.log("main.js (server) says - I am client2.b")
  }
  if (Meteor.isServer) {
    console.log("main.js (server) says - I am server2.b")
  }
});

