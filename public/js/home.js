$(document).ready(function() {
    $('a.messaging').click(function() {
        var name = $(this).text().trim();
        var person = $(this).text().trim().toLowerCase();
        console.log(person);

        var split = person.split(' ');
        var email = split[0] + split[1] + '@gmail.com';

        $.post('/sendPartner', {"name": name, "email": email}, function(err) {
            document.location.href = '/messages';
        });
    });
});