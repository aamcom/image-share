import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
Images = new Mongo.Collection('images');

console.log('main.js (client ) says -  nb images : ' + Images.find().count());


Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});
Template.body.helpers({
  username:function(){
    if(Meteor.user()){
    console.log("toi",Meteor.user().emails[0]);
    return Meteor.user().emails[0].address
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

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(Images.find().count());
  },
});

  Template.images.helpers({
    images:Images.find({},{
      sort:{
        createdOn:-1
      }
    })
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
    }
  })
  if (Meteor.isClient) {
    console.log("main.js (client) says - I am client");
    //if (Images.find().count() == 0) 
    //  console.log("main.js (client) says - Images 0");
    //console.log("main.js (client) says - Images : ", Images);
  }
  if (Meteor.isServer) {
    console.log("main.js (client) says - I am server")
  }

  Template.image_add_form.events({
    'submit .js-add-image':function(event){
      var img_src, img_alt;
      img_src = event.target.img_src.value;
      img_alt = event.target.img_alt.value;

      Images.insert({
        img_src:img_src,
        img_alt:img_alt,
        createdOn: new Date()
      });
      $("#image_add_form").modal('hide');
      console.log("src: "+img_src+" src_alt: "+img_alt);
      return false;
    }
  })