

var auth = firebase.auth();
$("#passwordResetButton").click(function () {

    $("#forgotPasswordError").text("Loading...");

    $("#passwordResetButton").css('background-color', "#a3a3a3");
    $("#passwordResetButton").text('Please wait...');

    var emailAddress = $("#forgottenEmailReset").val();
    auth.sendPasswordResetEmail(emailAddress).then(function () {
        // Email sent.
        console.log("Email sent!");
        $("#forgotPasswordError").text("Email Sent!");
        window.location.replace('/sa/log-in');
        alert("Password reset email sent.");
        $("#passwordResetButton").css('background-color', "#3898ec");
        $("#passwordResetButton").text('Send password reset link');

    }).catch(function (error) {
        $("#forgotPasswordError").text(error);
        $("#passwordResetButton").css('background-color', "#3898ec");
        $("#passwordResetButton").text('Send password reset link');
        console.log("ERROR" + error);

    });
});






