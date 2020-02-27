function noAccessScreen() {
    $("#hideIfNoAccess").hide();
    $("body").append("No access");
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

        console.log("Current User is:" + user);

        var userData = db.collection("Users").doc(user.uid);

        userData.get().then(function (user) {
            if (user.exists) {
                console.log("Document data:", user.data());
                if (user.data().accessBasic == true) {
                    //User has basic access (at least) begin rendering basic files.
                    // MS: What is the order in which we are getting those documents?
                    db.collection("basicAccessDocuments").get().then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) {
                            // MS: A lot of debug lines here
                            console.log("basic" + doc);

                            // MS: There is a lot of redundancy here, it might be worth creating some soft of template object for the HTML.
                            // MS: If only the receiving object getting the append call changes, it makes sense to create that object first, no matter if from a template or not.
                            if (doc.data().list == '1') {
                                $("#receiveList1Here").append('<tr><td> <a class="w-button fileView" style="background-color: transparent; color: black; text-decoration: underline;" href="' + doc.data().URL + '" target="_blank">'+doc.data().fileDescription+' </a></td><td><strong>' + doc.data().date + '</strong></td><td>' + doc.data().category + '</td></tr>');
                            }
                            if (doc.data().list == '2') {
                                $("#receiveList2Here").append('<tr><td> <a class="w-button fileView" style="background-color: transparent; color: black; text-decoration: underline;" href="' + doc.data().URL + '" target="_blank">'+doc.data().fileDescription+' </a></td><td><strong>' + doc.data().date + '</strong></td><td>' + doc.data().category + '</td></tr>');
                            }
                            if (doc.data().list == '3') {
                                $("#receiveList3Here").append('<tr><td> <a class="w-button fileView" style="background-color: transparent; color: black; text-decoration: underline;" href="' + doc.data().URL + '" target="_blank">'+doc.data().fileDescription+' </a></td><td><strong>' + doc.data().date + '</strong></td><td>' + doc.data().category + '</td></tr>');
                            }
                            if (doc.data().list == '4') {
                                $("#receiveList4Here").append('<tr><td> <a class="w-button fileView" style="background-color: transparent; color: black; text-decoration: underline;" href="' + doc.data().URL + '" target="_blank">'+doc.data().fileDescription+' </a></td><td><strong>' + doc.data().date + '</strong></td><td>' + doc.data().category + '</td></tr>');
                            } else {
                                $("#receiveOtherHere").append('<tr><td> <a class="w-button fileView" style="background-color: transparent; color: black; text-decoration: underline;" href="' + doc.data().URL + '" target="_blank">'+doc.data().fileDescription+' </a></td><td>' + doc.data().category + '</td></tr>');
                            }


                        });
                      

                    });

                }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!"); // This means the user isnt found, not the document, right?
                noAccessScreen();
            }
        }).catch(function (error) {
            // MS: Hard to tell what is wrong here, maybe show a error notification to the user?
            console.log("Error getting document:", error);
            noAccessScreen();
        });




    } else {
        // No user is signed in.
        noAccessScreen();
    }
});





// MS: Looking at how the messages are used, I wonder if this needs to be dynamic
var adminMessageRef = db.collection("Message").doc("latest");
adminMessageRef.get().then(function (message) {

    $("#injectAdminMessageHere").text(message.data().text);


}).catch(function (error) {
    console.log("Error retrieving admin message");
});



