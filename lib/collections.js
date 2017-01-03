Images = new Mongo.Collection('images');

//mise en place de la politique de securité
Images.allow({
    insert:function(userId, doc) {
        if (Meteor.user()){ // au moins il est logué 
            if (userId != doc.createdBy){
                console.log("Tentative insert doc <> user")
                return false; 
            }  
            else {
                console.log("User insert ok")
                return true;
            }
        }
        else {
                console.log("User non logué tente insert ");
                return  false;
        }
        
    },
    remove:function(userId, doc) {
        if (Meteor.user()){ // au moins il est logué 
            if (userId != doc.createdBy) {
                console.log("Tentative delete doc <> user");
                return false; 
            }  
            else {
                console.log("User delete ok");
                return true;
            }
        }
        else {
                console.log("User non logué tente del ");
                return  false;
            }
    }   
})

