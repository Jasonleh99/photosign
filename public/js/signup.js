$(document).ready(function() {
    var name, email;
    $("#create-account").click(function() {
        name = $('#form-name').val();
        email = $('#form-email').val();

        $.post("/updateUser", {name: name, email: email}, function(data) {
            if(data === 'done') {
                console.log('success');
            }
        });
    })
})