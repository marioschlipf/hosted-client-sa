
signupButton.addEventListener('click', function () {
    var email = signupEmail.value;
    var password = signupPassword.value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (user) {

            var user1 = firebase.auth().currentUser;
            user1.sendEmailVerification().then(function () {
                firebase.auth().signOut().then(function () {
                    window.location.replace('/sa/log-in');
                    alert("Sign Up Success! Please verify your email before logging in.")

                    // Sign-out successful.
                }).catch(function (error) {
                    // An error happened.
                    window.location.replace('/sa/log-in');
                    // MS This is an odd error message and most likely not an intended redirect target :-)
                    alert("Sign Up Success! Please verify your email before logging in.")

                });

            }).catch(function (error) {
                // An error happened.
                window.location.replace('/sa/log-in');

                // MS is this error even shown when you do the redirect before?
                console.log(error);
            });

        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            $("#signUpError").text("Error: " + errorMessage);
            console.log('Error code' + errorCode);
            console.log('Error message' + errorMessage);

        });


});

// MS Remove unused code
    // function signup(){



    // }

