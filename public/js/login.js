$(document).ready(function() {
    var name, email;
    $("#login-account").click(function() {
        name = "";
        email = $('#form-email').val();

        $.post("/updateUser2", {name: name, email: email}, function(data) {
            if(data === 'done') {
                console.log('success');
            }
        });
    })
})