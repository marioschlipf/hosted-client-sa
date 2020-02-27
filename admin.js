

$('#datepicker').datepicker({ dateFormat: 'dd/mm/yy' });


var db = firebase.firestore();
db.collection("Users").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
        console.log(doc.id, " => ", doc.data());
        var lastLoginDate;
        db.collection("LastLogin").doc(doc.id).get().then(function (lastLogin1) {
            if (lastLogin1.exists) {
                lastLoginDate = lastLogin1.data().lastLogin;
            } else {
                lastLoginDate = "-";
            }
            if (doc.data().admin != true) {
                if (doc.data().accessBasic == true) {
                    
                        $("#userList").append('<tr><td>' + doc.data().email + '</td><td>' + lastLoginDate + '</td><td> <select class="w-select permission" id="' + doc.id + '"><option value="noAccess">No Access</option><option value="basicAccess" selected>Basic Access</option></select> </tr');
                    
                } else {
                    $("#userList").append('<tr><td>' + doc.data().email + '</td><td>' + lastLoginDate + '</td><td> <select class="w-select permission" id="' + doc.id + '"><option value="noAccess" selected>No Access</option><option value="basicAccess">Basic Access</option></select> </td></tr');
                }
            }
        });
    });
});
$(document).on("change", ".w-select.permission", function () {
    console.log($(this).val());
    var changedPermission;
    $(this).prop('disabled', true);
    switch ($(this).val()) {
        case "noAccess":
            changedPermission = {
                accessBasic: false
           
            };
            break;
        case "basicAccess":
            changedPermission = {
                accessBasic: true
           
            };
            break;
        
        default:
            changedPermission = {
                accessBasic: true
     
            }
    }

    var userToUpdate = db.collection("Users").doc($(this).attr('id'));
    userToUpdate.get().then(function (updateUser) {
        if (updateUser.exists) {
            userToUpdate.update(changedPermission)
                .then(function () {
                    alert("Permission changed successfully");
                    location.reload();
                    $(this).prop('disabled', false);
                })
                .catch(function (error) {
                    alert("Error changing permission: " + error);
                    location.reload();
                    $(this).prop('disabled', false);
                });
        }
    }).catch(function (error) {
        alert("Error retrieving user:" + error);
    });
});

db.collection("basicAccessDocuments").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {

        

       
        switch(doc.data().list) {
            case "1":
                $("#inject0DocsHere").append('<tr><td>' + doc.data().fileDescription + '</td><td> ' + doc.data().date + ' </td><td>' + doc.data().category + '</td><td>General</td><td> <a class="w-button fileView" href="' + doc.data().URL + '" target="_blank">View </a></td><td> <a class="w-button fileDelete" id="' + doc.id + '">Delete</a></td><td><a class="w-button fileEdit" id="' + doc.id + '">Edit</a></td></tr>');
                break;
            case "2":
                $("#inject1DocsHere").append('<tr><td>' + doc.data().fileDescription + '</td><td> ' + doc.data().date + ' </td><td>' + doc.data().category + '</td><td>Eurex Repo</td><td> <a class="w-button fileView" href="' + doc.data().URL + '" target="_blank">View </a></td><td> <a class="w-button fileDelete" id="' + doc.id + '">Delete</a></td><td><a class="w-button fileEdit" id="' + doc.id + '">Edit</a></td></tr>');
                break;
            case "3":
                $("#inject2DocsHere").append('<tr><td>' + doc.data().fileDescription + '</td><td> ' + doc.data().date + ' </td><td>' + doc.data().category + '</td><td>HQLAX</td><td> <a class="w-button fileView" href="' + doc.data().URL + '" target="_blank">View </a></td><td> <a class="w-button fileDelete" id="' + doc.id + '">Delete</a></td><td><a class="w-button fileEdit" id="' + doc.id + '">Edit</a></td></tr>');
                break;
            case "4":
                $("#inject3DocsHere").append('<tr><td>' + doc.data().fileDescription + '</td><td> ' + doc.data().date + ' </td><td>' + doc.data().category + '</td><td>Trusted 3rd Party</td><td> <a class="w-button fileView" href="' + doc.data().URL + '" target="_blank">View </a></td><td> <a class="w-button fileDelete" id="' + doc.id + '">Delete</a></td><td><a class="w-button fileEdit" id="' + doc.id + '">Edit</a></td></tr>');
                break;
            default:  
                $("#inject4DocsHere").append('<tr><td>' + doc.data().fileDescription + '</td><td> ' + doc.data().date + ' </td><td>' + doc.data().category + '</td><td>Other</td><td> <a class="w-button fileView" href="' + doc.data().URL + '" target="_blank">View </a></td><td> <a class="w-button fileDelete" id="' + doc.id + '">Delete</a></td><td><a class="w-button fileEdit" id="' + doc.id + '">Edit</a></td></tr>');
        
        }


     
       
    });
});


// Create a reference under wh
let storageRef = firebase.storage().ref();


$(document).on("click", ".w-button.fileDelete", function () {
   if(confirm("Are you sure you want to delete this file?")){
     // Create a reference to the file to delete
     var refDeleted = $(this).attr('id');
     var clickedRef = storageRef.child(refDeleted);
 
 
     // File deleted successfully
     db.collection("basicAccessDocuments").doc(refDeleted).delete().then(function () {
         console.log("Document successfully deleted!");
         clickedRef.delete().then(function () {
             alert("File deleted Successfully");
             location.reload();
         }).catch(function (error) {
            // MS Error handling?
         });
         location.reload();
 
     }).catch(function (error) {
         console.error("Error removing document: ", error);
         alert("Error deleting file from db: " + error);
     });
 
 

   }
   return false;
   

});
$(document).on("click", ".w-button.fileEdit", function () {
    var clickedRow = $(this).closest('tr');
  
 
    if($(this).text() == "Edit"){
        $(this).text("Save");
        $(this).css("background-color", "#2ecc71");
        // Create a reference to the file to edit
        
        

        var documentDescription = $(clickedRow).children().eq(0);
        var publishDate = $(clickedRow).children().eq(1);
        
        var category = $(clickedRow).children().eq(3);
        var list = $(clickedRow).children().eq(4);

        var storedDescription = $(documentDescription).text();
        var storedPublishDate = $(publishDate).text();
        
        var storedCategory = $(category).text();
        var storedList = $(list).text();
        
    
        $(documentDescription).html("<input class='text-field-5 w-input descEdit' type='text' value='"+storedDescription+"'/>");
        $(publishDate).html("<input class='text-field-5 w-input dateEdit' type='text' value='"+storedPublishDate+"'/>");
        $(category).html("<select id='categoryEdit' name='fileCategory' data-name='fileCategory' required='' class='select-field w-select'><option value='fees'>Fees</option><option value='general'>General</option><option value='legal'>Legal</option><option value='contracts'>Contracts</option></select>");
        $(list).html("<select id='listEdit' name='List-Section' data-name='List Section' required='' class='select-field w-select'><option value='1'>General</option><option value='2'>Eurex Repo</option><option value='3'>HQLA-X</option><option value='4'>Trusted 3rd Party</option></select>")
       

    }else if ($(this).text() == "Save"){
        $(this).attr('readonly', true);
        $(this).text('Saving...');
        var refEdited = $(this).attr('id');

        var newDescription =$(".descEdit").val();
        var newDate = $(".dateEdit").val();
    
        var newCategory = $("#categoryEdit").val();
        var newList = $("#listEdit").val();
        
        db.collection("basicAccessDocuments").doc(refEdited).update({category: newCategory, date: newDate, fileDescription: newDescription, list: newList}).then(function(){
            alert("Document Edited Successfully");
            location.reload();
        }).catch(function(error){
            alert("Error: " + error);
        });
       
     
    }

    


});





var uploadedFile;

$("#fileButton").on("change", function (e) {
    uploadedFile = e.target.files[0];
});


function uploadFile(id) {
    let date = $("#datepicker").val();
    console.log(date);
    let file = uploadedFile;
    let storageRef = firebase.storage().ref(id);
    let task = storageRef.put(file);
    let documentAccess = "basicAccess";
    let fileName = $("#fileName").val();
    let fileCategory = $("#fileCategory").val();
    let fileList = $("#listSection").val();

    task.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function progress(snapshot) {
            let percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            $("#fileUploadStatus").text("Upload is " + percentage + "%done")

            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    $("#fileUploadStatus").text('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING:
                    $("#fileUploadStatus").text('Upload is running');
                    break;
            }
        }, function (error) {

            $("#fileUploadStatus").text("There was an error! Try again.")


        }, function () {
            console.log("Success??"); // MS A lot of debug logging here.
            $("#fileUploadStatus").text("Success!");
            task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
               // if (documentAccess == "basicAccess") {
                    db.collection("basicAccessDocuments").doc(id).set({
                        fileDescription: fileName,
                        URL: downloadURL,
                        date: date,
                        category: fileCategory,
                        list: fileList
                    })
                        .then(function () {
                            console.log("File upload successful.");
                            alert("File upload successful.")
                            location.reload();
                        })
                        .catch(function (error) {
                            alert("Error adding to DB:" + error);
                            console.error("Error writing document: ", error);
                        });
                
                return downloadURL;

            });
        });
}

$("#uploadFileButton").on("click", function () {
    let fileName = $("#fileName").val();
    let file = uploadedFile;
    if (file && fileName) {
        
            db.collection("basicAccessDocuments").add({

            })
                .then(function (docRef) {
                    console.log(docRef);
                    uploadFile(docRef.id);
                })
                .catch(function (error) {
                    alert("Error adding to DB:" + error);
                    console.error("Error writing document: ", error);
            });
        

    } else {
        alert("Missing fields/No file");
    }


});




$("#addUserToWhitelist").on("click", function () {
    var emailForWhitelist = $("#whitelistEmailField").val();
    $(this).click(false);
    $(this).css("background-color", "gray");
    db.collection("Whitelist").doc(emailForWhitelist).set({})
        .then(function () {
            alert("User added to whitelist.");
            location.reload();
            $(this).click(true);
            $(this).css("background-color", "#3898ec");
        }); // MS No error handling

});

db.collection("Whitelist").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
        console.log(doc.id);
        $("#addWhitelistEmailsHere").append('<div class="div-block-26"><div>' + doc.id + '</div><a href="#" class="button-12 w-button deleteWhiteListUser" id="' + doc.id + '">Remove</a></div>');
    });
});
$(document).on("click", ".deleteWhiteListUser", function () {
    $(this).css("background-color", "gray");
    db.collection("Whitelist").doc($(this).attr('id')).delete().then(function () {
        alert("User successfully deleted from whitelist");
        $(this).css("background-color", "#3898ec");
        location.reload();
    }).catch(function (error) {
        console.error("Error removing document: ", error);
        $(this).css("background-color", "#3898ec");
    });

});



var adminMessageRef = db.collection("Message").doc("latest");
adminMessageRef.get().then(function (message) {
    $("#updateMessageField").val(message.data().text);
}).catch(function (error) {
    console.log("Error retrieving admin message");
});

$("#updateMessageButton").on("click", function () {
    var updatedText = $("#updateMessageField").val();
    console.log(updatedText + "IS the new text");
    adminMessageRef.set({ text: updatedText })
        .then(function () {
            alert("Message updated");
            window.location.reload();
        })
        .catch(function (error) {
            alert("There was an error updating message: " + error);
        });
});

