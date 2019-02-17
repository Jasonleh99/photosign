$(document).ready(function() {

    $('#chevron').click(function() {
        // window.scrollTo(0,0);
        console.log('here');
        $('html, body').animate({
            scrollTop: $('#about').offset().top
        }, 900);

        $.post('/test', function(data) {
            console.log(data);
        });
    })

})