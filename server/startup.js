
if (Meteor.isServer) {
    console.log("startutp.js says - I am server2.bb")
    Meteor.startup(function(){
        if (Images.find().count() == 0) 
            for(i=100;i<1000;i++){
                //var st= "IMG_0"+i+".JPG";
                var st= i+".jpg";
                Images.insert(
                    {
                        img_src:st,
                        img_alt:"ici une image n°"+i
                    }
                )
                console.log("startutp.js says - st:"+st);
            }// endfor 
    })
}