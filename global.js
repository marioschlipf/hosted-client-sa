// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAatNm7AnTAxf97LMcwNh7ddd2YGAWU6CQ",
    authDomain: "hqlax-sa.firebaseapp.com",
    databaseURL: "https://hqlax-sa.firebaseio.com",
    projectId: "hqlax-sa",
    storageBucket: "gs://hqlax-sa.appspot.com/",
    messagingSenderId: "17598872814",
    appId: "1:17598872814:web:5220ed09a593d0137ac7ff"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
var storage = firebase.app().storage("gs://hqlax-sa.appspot.com/");



var privatePages = [
    '/sa/private'
];
var publicPages = [
    '/sa/sign-up',
    '/sa/log-in',
    '/sa/forgot-password'
];
var adminPages = [
    '/sa/admin'
];
var outside = [
    '/sa',
    '/SA'
];



firebase.auth().onAuthStateChanged(function (user) {
    var currentPath = window.location.pathname;
    if (user) {
        var isVerified = user.emailVerified;
        if (isVerified == true) {

            var docRef = db.collection("Users").doc(firebase.auth().currentUser.uid);

            docRef.get().then(function (doc) {
                if (doc.exists) {
                    if (doc.data().admin == true) {
                        // User is signed in with Admin rights.
                        if (publicPages.includes(currentPath) || privatePages.includes(currentPath) || outside.includes(currentPath)) {
                            window.location.replace('/sa/admin');
                        } else {
                            console.log("User is logged in with admin");
                            console.log('Email:' + user.email);
                            console.log('UID:' + user.uid);
                            loadingScreen.style.display = 'none';
                        }
                    } else if (doc.data().accessBasic == true) {
                        var userDBREF = db.collection("LastLogin").doc(firebase.auth().currentUser.uid);
                        // Set the "capital" field of the city 'DC'
                        var d = new Date();
                        var strDate = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();


                        userDBREF.set({
                            isVerified: true,
                            lastLogin: strDate
                        });

                        // User is signed in with access.
                        if (publicPages.includes(currentPath) || adminPages.includes(currentPath) || outside.includes(currentPath)) {
                            window.location.replace('/sa/private');
                        } else {
                            console.log("User is logged in with access");
                            console.log('Email:' + user.email);
                            console.log('UID:' + user.uid);
                            loadingScreen.style.display = 'none';
                        }

                    } else {

                        if (privatePages.includes(currentPath) || adminPages.includes(currentPath) || outside.includes(currentPath)) {
                            alert("Account not activated by administrator");
                            console.log("User is not logged in in with access");
                            console.log('Email:' + user.email);
                            console.log('UID:' + user.uid);
                            firebase.auth().signOut().then(function () {
                                // Sign-out successful.
                            }).catch(function (error) {
                                // An error happened.
                            });
                            loadingScreen.style.display = 'none';
                        } else {

                            console.log("User is not logged in in with access");
                            console.log('Email:' + user.email);
                            console.log('UID:' + user.uid);
                            firebase.auth().signOut().then(function () {
                                // Sign-out successful.
                            }).catch(function (error) {
                                // An error happened.
                            });
                            loadingScreen.style.display = 'none';
                        }
                    }
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    firebase.auth().signOut().then(function () {
                        // Sign-out successful.
                    }).catch(function (error) {
                        // An error happened.
                    });
                }
            }).catch(function (error) {
                if (privatePages.includes(currentPath) || adminPages.includes(currentPath) || outside.includes(currentPath) || publicPages.includes(currentPath)) {
                    alert("Error getting status:" + error);
                    console.log("Error getting document:", error);
                } else {

                }


                console.log("User is not logged in in with access");
                console.log('Email:' + user.email);
                console.log('UID:' + user.uid);
                firebase.auth().signOut().then(function () {
                    // Sign-out successful.
                }).catch(function (error) {
                    // An error happened.
                });
                loadingScreen.style.display = 'none';




            });
        } else if (window.location.pathname != "/sa/sign-up") {
            if (confirm("Account not verified, send E-mail again?")) {
                //send verification email, logout.
                var user1 = firebase.auth().currentUser;
                user1.sendEmailVerification().then(function () {
                    // Email sent.
                    alert("Email sent.");
                    firebase.auth().signOut().then(function () {
                        // Sign-out successful.
                    }).catch(function (error) {
                        // An error happened.
                    });

                }).catch(function (error) {
                    // An error happened.
                    console.log(error);
                    firebase.auth().signOut().then(function () {
                        // Sign-out successful.
                    }).catch(function (error) {
                        // An error happened.
                    });
                });

            } else {
                firebase.auth().signOut().then(function () {
                    // Sign-out successful.
                }).catch(function (error) {
                    // An error happened.
                });
            }

        }






    } else {
        // User is signed out.
        if (privatePages.includes(currentPath) || adminPages.includes(currentPath) || outside.includes(currentPath)) {
            window.location.replace('/sa/log-in');
        } else {
            console.log("No User is logged in");
            loadingScreen.style.display = 'none';
        }
    }
});










$("#loginButton").click(login);



function login() {
    console.log('test');
    var email = loginEmail.value;
    var password = loginPassword.value;
    firebase.auth().signInWithEmailAndPassword(email, password)


        .then(function () {
            var docRef = db.collection("Users").doc(firebase.auth().currentUser.uid);


            docRef.get().then(function (doc) {
                if (doc.exists) {
                    if (doc.data().admin == true) {

                        window.location.replace('./admin');
                    } else if (doc.data().accessBasic == true) {


                        window.location.replace('./private');

                    } else {
                        var errorCode = "1";
                        var errorMessage = "Account not activated";
                        console.log('Error code: ' + errorCode);
                        console.log('Error message: ' + errorMessage);
                        loginButton.style.display = 'block';
                        loginError.innerText = errorMessage;
                        loginError.style.display = 'block';
                    }
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });

        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('Error code: ' + errorCode);
            console.log('Error message: ' + errorMessage);
            loginButton.style.display = 'block';
            loginError.innerText = errorMessage;
            loginError.style.display = 'block';
        });




}

$("#logoutLink").click(logout);




function logout() {
    firebase.auth().signOut();
}

