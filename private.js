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
                    db.collection("basicAccessDocuments").get().then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) {
                            console.log("basic" + doc);

                            if (doc.data().list == '1') {
                                $("#receiveList1Here").append('<tr><td>' + doc.data().fileDescription + '</td><td><strong>' + doc.data().date + '</strong></td><td>' + doc.data().category + '</td><td><a href="' + doc.data().URL + '" class="tablebutton w-button fileView" target="_blank">View</a></td></tr>');
                            }
                            if (doc.data().list == '2') {
                                $("#receiveList2Here").append('<tr><td>' + doc.data().fileDescription + '</td><td><strong>' + doc.data().date + '</strong></td><td>' + doc.data().category + '</td><td><a href="' + doc.data().URL + '" class="tablebutton w-button fileView" target="_blank">View</a></td></tr>');
                            }
                            if (doc.data().list == '3') {
                                $("#receiveList3Here").append('<tr><td>' + doc.data().fileDescription + '</td><td><strong>' + doc.data().date + '</strong></td><td>' + doc.data().category + '</td><td><a href="' + doc.data().URL + '" class="tablebutton w-button fileView" target="_blank">View</a></td></tr>');
                            }
                            if (doc.data().list == '4') {
                                $("#receiveList4Here").append('<tr><td>' + doc.data().fileDescription + '</td><td><strong>' + doc.data().date + '</strong></td><td>' + doc.data().category + '</td><td><a href="' + doc.data().URL + '" class="tablebutton w-button fileView" target="_blank">View</a></td></tr>');
                            } else {
                                $("#receiveOtherHere").append('<tr><td>' + doc.data().fileDescription + '</td><td><strong>' + doc.data().date + '</strong></td><td>' + doc.data().category + '</td><td><a href="' + doc.data().URL + '" class="tablebutton w-button fileView" target="_blank">View</a></td></tr>');
                            }


                        });
                        if (user.data().accessMember == true) {

                            db.collection("memberAccessDocuments").get().then(function (querySnapshot1) {
                                querySnapshot1.forEach(function (doc) {

                                    if (doc.data().list == '1') {
                                        $("#receiveList1Here").append('<tr><td>' + doc.data().fileDescription + '</td><td><strong>' + doc.data().date + '</strong></td><td>' + doc.data().category + '</td><td><a href="' + doc.data().URL + '" class="tablebutton w-button fileView" target="_blank">View</a></td></tr>');
                                    }
                                    if (doc.data().list == '2') {
                                        $("#receiveList2Here").append('<tr><td>' + doc.data().fileDescription + '</td><td><strong>' + doc.data().date + '</strong></td><td>' + doc.data().category + '</td><td><a href="' + doc.data().URL + '" class="tablebutton w-button fileView" target="_blank">View</a></td></tr>');
                                    }
                                    if (doc.data().list == '3') {
                                        $("#receiveList3Here").append('<tr><td>' + doc.data().fileDescription + '</td><td><strong>' + doc.data().date + '</strong></td><td>' + doc.data().category + '</td><td><a href="' + doc.data().URL + '" class="tablebutton w-button fileView" target="_blank">View</a></td></tr>');
                                    }
                                    if (doc.data().list == '4') {
                                        $("#receiveList4Here").append('<tr><td>' + doc.data().fileDescription + '</td><td><strong>' + doc.data().date + '</strong></td><td>' + doc.data().category + '</td><td><a href="' + doc.data().URL + '" class="tablebutton w-button fileView" target="_blank">View</a></td></tr>');
                                    } else {
                                        $("#receiveOtherHere").append('<tr><td>' + doc.data().fileDescription + '</td><td><strong>' + doc.data().date + '</strong></td><td>' + doc.data().category + '</td><td><a href="' + doc.data().URL + '" class="tablebutton w-button fileView" target="_blank">View</a></td></tr>');
                                    }
                                });
                            });
                        }

                    });

                }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                noAccessScreen();
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
            noAccessScreen();
        });




    } else {
        // No user is signed in.
        noAccessScreen();
    }
});





var adminMessageRef = db.collection("Message").doc("latest");
adminMessageRef.get().then(function (message) {

    $("#injectAdminMessageHere").text(message.data().text);


}).catch(function (error) {
    console.log("Error retrieving admin message");
});



