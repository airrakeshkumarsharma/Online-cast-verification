function recognize_image(){
 document.getElementById('transcription').innerText = "(Recognizing...)"
 OCRAD(document.getElementById("pic"), {
  numeric: true
}, function(text){
})
}
function load_file () {
 var reader = new FileReader();
 reader.onload = function(){
  var img = new Image();
  img.src = reader.result;
  img.onload = function(){
   document.getElementById('nose').innerHTML = ''
   document.getElementById('nose').appendChild(img)
   OCRAD(img, function(text){
    var vari = [];
    document.getElementById('transcription').className = "done";
    var X =  text;
    var divide = X.split(':');
    vari[1] = divide[1].split(',');
    vari[2] = divide[2].split(',');
    vari[3] = divide[3].split(',');
    vari[4] = divide[4].split(',');
    vari[5] = divide[5].split(',');
    vari[6] = divide[6].split(',');
    vari[7] = divide[7].split(',');
    vari[8] = divide[8].split('.');
    $.ajax({
      type: 'post',
      url: '/imageRead',
      data: {'name':vari[1][0],'father':vari[2][0],'vill':vari[3][0],'mandal':vari[4][0],'state':vari[5][0],'phone':vari[6][0],'caste':vari[7][0],'pin_code':vari[8][0]},
      success: function(data)
      {
        var details= JSON.stringify(data[0]);
        var JsonData  = JSON.parse(details);
        $('#name').text(JsonData.name);
        $('#father').text(JsonData.father);
        $('#village').text(JsonData.vill);
        $('#Mandal').text(JsonData.mandal);
        $('#state').text(JsonData.state);
        var phone  = JsonData.phone;
        var mobile = phone.replace(/t/gi, "7");
        $('#phone').text(mobile);
        $('#caste').text(JsonData.caste);
        $('#pin').text(JsonData.pin_code);
        $('#userData').css('display','block')
      }
    });

 });
 }
}
var Y = reader.readAsDataURL(document.getElementById('picker').files[0]); 
}
