Images = new Mongo.Collection('images');

//mise en place de la politique de securité
Images.allow({
    insert:function(userId, doc) {
        if (Meteor.user()){ // au moins il est logué 
            if (userId != doc.createdBy){
                console.log("Tentative insert doc <> user : NO")
                return false; 
            }  
            else {
                console.log("User insert : OK")
                return true;
            }
        }
        else {
                console.log("User non logué tente insert : NO");
                return  false;
        }
        
    },
    remove:function(userId, doc) {
        if (Meteor.user()){ // au moins il est logué 
            if (userId != doc.createdBy) {
                console.log("Tentative delete doc <> user : NO");
                return false; 
            }  
            else {
                console.log("User delete : OK");
                return true;
            }
        }
        else {
                console.log("User non logué tente del : NO");
                return  false;
            }
    }  ,
    update:function(userId, doc) {
        if (Meteor.user()){ // au moins il est logué 
            if (userId != doc.createdBy) {
                console.log("Tentative update doc <> user : .... hum ... OK");
                return true; 
            }  
            else {
                console.log("User update :OK");
                return true;
            }
        }
        else {
                console.log("User non logué tente update : NO");
                return  false;
            }
    }    
})

