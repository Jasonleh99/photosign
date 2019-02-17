window.addEventListener("load", function() {
    document.getElementById('picture-upload').onchange = function(event) {
      var reader = new FileReader();
      var file = event.srcElement.files[0];
      reader.readAsDataURL(file);
      reader.onload = function() {
        var fileContent = reader.result;
        console.log(fileContent);
        $.post('/uploadImage', {"base64Image": fileContent}, function(data) {
          if(data === 'done') {
            console.log('success');
          }
        });
      }
    };
});

$(document).ready(function() {
  $('#hidepic').hide();
  $('#model-portfolio').hide();
  $('#model-port').css("background-color", "#777577");


  $('#model-port').click(function() {
    $(this).css("background-color", "#ff87a1");
    $('#photo-port').css("background-color", "#777577");
    $('#model-portfolio').show();
    $('#hidepic').hide();
    $('#photo-portfolio').hide();
  });

  $('#photo-port').click(function() {
    $(this).css("background-color", "#ff87a1");
    $('#model-port').css("background-color", "#777577");
    $('#hidepic').hide();
    $('#model-portfolio').hide();
    $('#photo-portfolio').show();
  });


});