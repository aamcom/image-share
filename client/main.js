import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
Images = new Mongo.Collection('images');

console.log('main.js (client ) says -  nb images : ' + Images.find().count());

Accounts.ui.config({
  passwordSignupFields:"USERNAME_AND_EMAIL"
});

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  }
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(Images.find().count());
  },
});

Template.body.helpers({
  username:function(){
    if(Meteor.user()){
    console.log("toi",Meteor.user().username);
    return Meteor.user().username
    }
    else
      return "<anonym>";
  },
  nbimages:function(){
    if(Images.find().count())
      return Images.find().count()
    else 
      return -1;
  }
});


  Template.images.helpers({
    /*
    images: function() {
      if(Session.get("userFilter")) {
        return Images.find({},{sort:{createdOn:-1}})
      }
      else {
        return Images.find({},{sort:{createdOn:-1}})
      }
    },*/
    images: function() {
        return Images.find({},{sort:{createdOn:-1,rating:-1}})
    },
    getUser: function(user_id){
      var user = Meteor.users.findOne({_id:user_id})
      if (user) {
        return user.username;
      }
      else return "anonym";
    }
  });
  
  Template.images.events({
    'click .js-image': function(event) {
      console.log(event);
      $(event.target).css("width","100px")
    },
    'click .js-del-image': function(event) {
      var image_id = this._id;
      $("#"+image_id).hide('slow',function () {
        console.log('del:',image_id);
        Images.remove({"_id":image_id});
      })    
    },
    'click .js-show-image-form': function(event) {
      $("#image_add_form").modal('show');
    },
    'click .js-set-image-filter': function(event) {
      Session.set("userFilter",this.createdBy)
      console.log(Session.get("userFilter"))
    },
    'click .js-rate-image': function(event) {
      var rating = $(event.currentTarget).data("userrating");
      console.log("rating:"+rating);
      var image_id = this.id;
      console.log("image_id:"+image_id);
      Images.update({_id:image_id},
                      {$set:{rating:rating}});
    }
  })



  Template.image_add_form.events({
    'submit .js-add-image':function(event){
      var img_src, img_alt;
      img_src = event.target.img_src.value;
      img_alt = event.target.img_alt.value;

      if(Meteor.user()){
        Images.insert({
          img_src:img_src,
          img_alt:img_alt,
          createdOn: new Date(),
          createdBy: Meteor.user()._id
        });
      }
      $("#image_add_form").modal('hide');
      console.log("src: "+img_src+" src_alt: "+img_alt);
      return false;
    }
  })

// test si client ou serveur ... inutile 
  if (Meteor.isClient) {
    console.log("main.js (client) says - I am client");
    //if (Images.find().count() == 0) 
    //  console.log("main.js (client) says - Images 0");
    //console.log("main.js (client) says - Images : ", Images);
  }
  if (Meteor.isServer) {
    console.log("main.js (client) says - I am server")
  }