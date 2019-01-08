function ChangeCaptcha() {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 6;
	var ChangeCaptcha = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		ChangeCaptcha += chars.substring(rnum,rnum+1);
	}
	document.getElementById('randomfield').value = ChangeCaptcha;
	document.getElementById('randomfield1').value = ChangeCaptcha;
}
function check() {
	var email = document.getElementById('login_username');
	var pws   = document.getElementById('login_password');
	var cpta  = document.getElementById('CaptchaEnter');
	if (email.value=='') {
		email.required();
	}
	else if (pws.value=='') {
		pws.required();
	}
	else if (cpta.value=='') {
		cpta.required();
	}
	else if((cpta.value!= document.getElementById('randomfield').value)) {
		alert('Please re-check the captcha');
		return false;
	}
}