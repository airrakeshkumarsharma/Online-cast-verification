var express = require('express');
var router = express.Router();
var monk = require('monk');
var moment = require('moment');
var dbs = monk('localhost:27017/sih');
var sih = dbs.get('user'); // collection name of user
var userData = dbs.get('userData'); // collection of userData
var userfilledData = dbs.get('userfilledData'); // collection of userfilledData
var randomstring = require('randomstring'); // random number generation 
var adminLogin = dbs.get('admin');          //Admin data base
var superadmin = dbs.get('superadmin');     //superadmin data base
var onlineCast = dbs.get('onlineCast');   // finally uploaded by the officer
var contact = dbs.get('contact');
var email   = require('emailjs/email');
var nodemailer = require('nodemailer');    // email package for sending email
var multer = require('multer');    // multipart request taking by the server
var xlstojson = require('xls-to-json-lc'); // package for file convert xls to json
var xlsxtojson = require('xlsx-to-json-lc');// package for file convert xlsx to json
/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/login', function(req, res){
	res.render('login');
});
router.get('/index', function(req, res){
	res.render('index');
});
  router.get('/about', function(req, res, next) {
  res.render('about');
});
  router.get('/services', function(req, res, next) {
  res.render('services');
});
router.get('/contact', function(req, res){
  res.render('contact');
});

// see the details of the cast

router.get('/updateCast', function(req, res){
  if (req.session && req.session.user) {
  sih.findOne({"user":req.session.user.user},function(err,data){
  userData.find({"adhaar":req.session.user.adhaar},function(err,docs){ 
    res.locals.member=docs; 
    res.locals.user=data;
	res.render('updateCast');
});
});
}
});


//Fill the form 


router.get('/OnlineCast', function(req, res){
  if (req.session && req.session.user) {
  sih.findOne({"user":req.session.user.user},function(err,data){
  userData.find({"adhaar":req.session.user.adhaar},function(err,docs){ 
    res.locals.member=docs; 
    res.locals.user=data;
  res.render('OnlineCast');
});
});
}
});
router.get('/OnlineCastByImage', function(req, res){
  if (req.session && req.session.user) {
  sih.findOne({"user":req.session.user.user},function(err,data){
  userData.find({"adhaar":req.session.user.adhaar},function(err,docs){ 
    res.locals.member=docs; 
    res.locals.user=data;
  res.render('OnlineCastByImage');
});

});
}
});




router.post('/add', function(req, res){
	res.render('add');
});
router.get('/user', function(req, res){
  if (req.session && req.session.user) {
    console.log(req.session.user.user);
    sih.findOne({"user":req.session.user.user},function(err,data){
    res.locals.user=data
    console.log(data);
    res.render('userHome');
    });
}
});
router.get('/super', function(req, res){
  if (req.session && req.session.username) {
  res.render('super');
}
});

//user signup 
router.post('/userSignUp', function(req, res){
	var data={
        adhaar:req.body.adhaar,
        user:req.body.userName,
        email:req.body.email,
        mobile:req.body.mob,
        dob:req.body.dob,
        password:req.body.paswd
	}
	sih.insert(data, function(err, doc){
    console.log(doc);
	});
sih.find({"email":req.body.email}, function(err, data){   
      var server  = email.server.connect({
                                 user:    "",
                                 password:"",
                                 host:    "smtp.gmail.com",
                                 ssl:     true
                              });
                                var msg="";
                                  msg += "<html><body class=\"\" style=\"\/* background-color: #7acbee; *\/font-family:sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;line-height:1.4;margin:0;padding:0;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"body\" style=\"border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background-color: #7acbee;width:100%;\"><tbody><tr><td style=\"font-family:sans-serif;font-size:14px;vertical-align:top;\">&nbsp;<\/td><td class=\"container\" style=\"font-family:sans-serif;font-size:14px;vertical-align:top;display:block;max-width:580px;padding:10px;width:580px;Margin:0 auto !important;\"><div class=\"content\" style=\"box-sizing:border-box;display:block;Margin:0 auto;max-width:580px;padding:10px;\"><!-- START CENTERED WHITE CONTAINER --><span class=\"preheader\" style=\"color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;visibility:hidden;width:0;\"><\/span><table class=\"main\" style=\"border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background:#fff;border-radius:3px;width:100%;\"><tbody><tr><td class=\"wrapper\" style=\"font-family:sans-serif;font-size:14px;vertical-align:top;box-sizing:border-box;padding:20px;\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;\"><tbody><tr><td style=\"font-family:sans-serif;font-size:14px;vertical-align:top;\"><p style=\"font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;margin-left: 210px;\"><img src='http:\/\/www.digitalgujarat.gov.in\/images\/logo.png' width=\"80px\"><\/p><p style=\"font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;\">Hi "+req.body.userName+", <br><br>Your Account Has Been Created successfully<\/b><\/p><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"btn btn-primary\" style=\"border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;box-sizing:border-box;width:100%;\"><tbody><tr><td align=\"left\" style=\"font-family:sans-serif;font-size:14px;vertical-align:top;\"><center><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;width:auto;\"><tbody><tr><td style=\"font-family:sans-serif;font-size:14px;vertical-align:top;background-color:#ffffff;border-radius:5px;text-align:center;background-color:;\"><\/td><\/tr><\/tbody><\/table><\/center><\/td><\/tr><\/tbody><\/table><p style=\"font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;\"><\/p><center><b><\/b><\/center><p><\/p><p style=\"font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;\">Thanks &amp; Regards,<br>Team#Six.<\/p><\/td><\/tr><\/tbody><\/table><\/td><\/tr><\/tbody><\/table><!-- START FOOTER --><div class=\"footer\" style=\"clear:both;padding-top:10px;text-align:center;width:100%;\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;\"><tbody><tr><td class=\"content-block\" style=\"font-family:sans-serif;font-size:14px;vertical-align:top;color: #000000;font-size:12px;text-align:center;\"><span class=\"apple-link\" style=\"color: #000000;font-size:12px;text-align:center;\">Govt of Gujarat<\/span><br>This email is system generated, please do not respond to this email.<\/td><\/tr><tr><td class=\"content-block powered-by\" style=\"font-family:sans-serif;font-size:14px;vertical-align:top;color: black;font-size:12px;text-align:center;\">Powered by Team#six. <br><a href='#' target=\"_blank\" style=\"color:white;\" ><\/a><\/td><\/tr><\/tbody><\/table><\/div><!-- END FOOTER --><!-- END CENTERED WHITE CONTAINER --><\/div><\/td><td style=\"font-family:sans-serif;font-size:14px;vertical-align:top;\">&nbsp;<\/td><\/tr><\/tbody><\/table><\/body><\/html>";
                              var message = {
                                 text:    msg,
                                 from:    "SIH<myhub.helpline@aditya.ac.in>",
                                 to:      req.body.email,  // change mail for faculty
                                 cc:      "",
                                 subject: "Welcome to SIH",
                                 attachment:
                                 [
                                    {data:msg, alternative:true},
                                    //attachment
                                    //{path:"C:/Users/Admin/Desktop/file/rj.html", type:"application/html", name:"rj.html"}

                                 ]
                              };

                              // send the message and get a callback with an error or details of the message that was sent
                              server.send(message, function(err, message) {
                              console.log(err || message);
                               });
});
res.redirect('/login');
});


// user login form 
router.post('/user', function(req, res){
		var username = req.body.email;
    req.session.user=username;
		var password = req.body.password;
    console.log(username);
    console.log(password);
	sih.findOne({email:username, password:password}, function(err, doc){
  var timein=moment().format('DD-MM-YYYY, hh:mm:ss a');
  sih.update({email:req.body.email},{$set: {logintime: timein}})
		if (!doc) {
			res.render('login');
		}
		else{
        delete doc.password;
        req.session.user = doc;
        res.redirect('/user');
      }
  });
});
//user logout
router.get('/logout', function(req, res){
  if(req.session && req.session.user){
  console.log(req.session.user.email);
  var timeout=moment().format('DD-MM-YYYY, hh:mm:ss a');
  sih.update({"email":req.session.user.email},{$set: {logouttime: timeout}})
  req.session.reset();
  res.redirect('/login');
}
});
// forgot password and sending email
router.post('/forgot', function(req, res){
	var adhaarCard = req.body.adhaar;
	var emailId = req.body.email;


	// check data is exist or not in data base
	sih.find({}, function(err, data){
	//checking the data from frontend and backend
		if(data.length != 0){
			var newpassword = randomstring.generate(6);
			for(i=0; i<data.length; i++)
				var Datas=data;
			for(i=0;i<Datas.length;i++){
        console.log(Datas[i].email);
			    if(Datas[i].email==req.body.email){
			     console.log("success");
			     var name=Datas[i].user;
			     //console.log(Datas[i].user);
			     console.log(name);
				  }
				  else{
				    console.log("not found");
				  }
      }
    }
    var newpassword = randomstring.generate(7);
  sih.update({"adhaar":req.body.adhaar},{$set:{"adhaar":req.body.adhaar,"password":newpassword}},function(err,user){
    if(!user){
      console.log('error');

    }

      else{

  var transporter = nodemailer.createTransport({
    service: 'gmail',
     host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'myhub@aditya.ac.in',
        pass: 'Thub@123'
    }
});
var msg = "<html><body class=\"\" style=\"\/* background-color: #7acbee; *\/font-family:sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;line-height:1.4;margin:0;padding:0;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"body\" style=\"border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background-color: #7acbee;width:100%;\"><tbody><tr><td style=\"font-family:sans-serif;font-size:14px;vertical-align:top;\">&nbsp;<\/td><td class=\"container\" style=\"font-family:sans-serif;font-size:14px;vertical-align:top;display:block;max-width:580px;padding:10px;width:580px;Margin:0 auto !important;\"><div class=\"content\" style=\"box-sizing:border-box;display:block;Margin:0 auto;max-width:580px;padding:10px;\"><!-- START CENTERED WHITE CONTAINER --><span class=\"preheader\" style=\"color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;visibility:hidden;width:0;\"><\/span><table class=\"main\" style=\"border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background:#fff;border-radius:3px;width:100%;\"><tbody><tr><td class=\"wrapper\" style=\"font-family:sans-serif;font-size:14px;vertical-align:top;box-sizing:border-box;padding:20px;\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;\"><tbody><tr><td style=\"font-family:sans-serif;font-size:14px;vertical-align:top;\"><p style=\"font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;margin-left: 210px;\"><img src='http:\/\/www.digitalgujarat.gov.in\/images\/logo.png' width=\"80px\"><\/p><p style=\"font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;\">Hi "+name+", <br><br>Your new password is <b>"+newpassword+"<\/b><\/p><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"btn btn-primary\" style=\"border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;box-sizing:border-box;width:100%;\"><tbody><tr><td align=\"left\" style=\"font-family:sans-serif;font-size:14px;vertical-align:top;\"><center><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;width:auto;\"><tbody><tr><td style=\"font-family:sans-serif;font-size:14px;vertical-align:top;background-color:#ffffff;border-radius:5px;text-align:center;background-color:;\"><\/td><\/tr><\/tbody><\/table><\/center><\/td><\/tr><\/tbody><\/table><p style=\"font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;\"><\/p><center><b><\/b><\/center><p><\/p><p style=\"font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;\">Thanks &amp; Regards,<br>Team#Six.<\/p><\/td><\/tr><\/tbody><\/table><\/td><\/tr><\/tbody><\/table><!-- START FOOTER --><div class=\"footer\" style=\"clear:both;padding-top:10px;text-align:center;width:100%;\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;\"><tbody><tr><td class=\"content-block\" style=\"font-family:sans-serif;font-size:14px;vertical-align:top;color: #000000;font-size:12px;text-align:center;\"><span class=\"apple-link\" style=\"color: #000000;font-size:12px;text-align:center;\">Govt of Gujarat<\/span><br>This email is system generated, please do not respond to this email.<\/td><\/tr><tr><td class=\"content-block powered-by\" style=\"font-family:sans-serif;font-size:14px;vertical-align:top;color: black;font-size:12px;text-align:center;\">Powered by Team#six. <br><a href='#' target=\"_blank\" style=\"color:white;\" ><\/a><\/td><\/tr><\/tbody><\/table><\/div><!-- END FOOTER --><!-- END CENTERED WHITE CONTAINER --><\/div><\/td><td style=\"font-family:sans-serif;font-size:14px;vertical-align:top;\">&nbsp;<\/td><\/tr><\/tbody><\/table><\/body><\/html>";
var mailOptions = {
from: '"SIH " <myhub@aditya.ac.in>', // sender address
to: req.body.email, // list of receivers
subject: 'Caste Verification',
//text: msg // plaintext body
html: msg // html body
}
// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, response){
if(error){
console.send("Email could not sent due to error: "+error);
}else{
console.send("Email has been sent successfully");
}
});
}
res.redirect('/login');
});
});
});
////////////////////////////////////////////////////////////
//uploading user image
var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './public/userImage')
        },
        filename: function (req, file, cb) {
          var originalname = file.originalname;
          var neworiginalname = originalname.substr(0, originalname.length-4); 
          console.log(neworiginalname);
            cb(null, neworiginalname + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
    });
     var upload = multer({ //multer settings
                     storage: storage
                 }).single('image');
//Form Updation
router.post('/OnlineCast',upload, function(req, res) {
  var data = {
	 	 adhaar:req.body.adhaar,
      first_name:req.body.first_name,
      last_name :req.body.last_name,
      email:req.body.email,
      phone:req.body.mobile,
      address:req.body.address,
      city:req.body.city,
      state:req.body.state,
      zip_code:req.body.zip,
      picture: req.file.originalname,
      gender : req.body.gender,
      dob : req.body.dob,
      status : 'submited'
	 };
   console.log(data);

	 userData.insert(data, function(err, data){
	 	if(err)
    console.log(err);
    else
      console.log(data);
});
upload(req,res,function(err){
  console.log(req.file.originalname);
 if(err){
      console.log("Invalid Extension")
      return;
 }
  console.log("uploaded successfully");
})
res.redirect('OnlineCast');
});
//upload
var Storage = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, "./public/certi");
     },
     filename: function(req, file, callback) {
      var originalname = req.session.user.adhaar;
         var neworiginalname = originalname
          console.log(neworiginalname);
            callback(null, neworiginalname + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
     }
 });
 var upload = multer({
     storage: Storage
 }).array("imgUploader", 3); //Field name and max count

 //upload caste certificate
 router.post("/Upload",upload, function(req, res) {
  var certi = req.session.user.adhaar;
  console.log(certi)
  if(req.session && req.session.user){
  userData.update({adhaar:req.session.user.adhaar},{$set:{"Certificate":certi}}, function(err, data){
    if(err)
    console.log(err);
    });
     upload(req, res, function(err) {
         if (err) {
             return console.log("Something went wrong!");
         }
         return console.log("File uploaded sucessfully!.");
     });
   }
   res.redirect('/user');
 });
// admin login
router.get('/admin', function(req, res, next) {
  if (req.session && req.session.username) {
      userData.find({status:'verified'}, function(err,doc){
      userData.find({$or:[{status:'submited'}, {status:'rejected'}]}, function(err, data){


      adminLogin.find({"username":req.session.username.username}, function(err,docs){
      console.log(docs);
      res.locals.user=doc;   // super 
      res.locals.user1=docs; 
      res.locals.user2 = data;  //data for user submitted
      res.render('adminPage');
      });
    });
    });
  }

  else {
    res.render('login');
  }
});

router.post('/adminpage', function(req, res, next) {
    var un=req.body.username;
    req.session.uname=un;
    var pw=req.body.password;
    console.log(un);
    console.log(pw);
    adminLogin.findOne({username:un,password:pw},function(err,docs){
                            
            // req.session.user = docs;
            if(!docs)
            {
          res.render('login',{error:'invalid username or password'});
            }
           else
          {
               delete docs.pass;
               req.session.username=un;
            req.session.username=docs;
          if( req.session.username=="admin"){
            res.render('adminPage');
          }
res.redirect('/admin');
          }
});
});
//admin logout
router.get('/adminlogout', function(req, res){
  if(req.session && req.session.username){
  console.log(req.session.username.username);
  req.session.reset();
  res.redirect('/login');
}
});


// #################################Admin part ###################################
//image upload using multer
var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './public/onlineCastImage')
        },
        filename: function (req, file, cb) {
          var originalname = file.originalname;
          var neworiginalname = originalname.substr(0, originalname.length-4); 
          console.log(neworiginalname);
            cb(null, neworiginalname + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
    });
     var upload = multer({ //multer settings
                     storage: storage
                 }).single('photo');
//Newsrepoort
router.post('/addNewByAdmin',upload, function(req, res){
  var data = {
      adhaar:req.body.adhaar,
      first_name:req.body.first_name,
      last_name :req.body.last_name,
      email:req.body.email,
      phone:req.body.phone,
      address:req.body.address,
      city:req.body.city,
      state:req.body.state,
      zip_code:req.body.zip,
      picture: req.file.originalname,
      gender : req.body.Gender,
      dob : req.body.dob,
      status : 'verified'
  };
   userData.insert(data, function(err, data){
    if(err)
    console.log(err);
});
upload(req,res,function(err){
  console.log(req.file.originalname);
 if(err){
      console.log("Invalid Extension")
      return;
 }
  console.log("uploaded successfully");
});
});
//creating certificate
router.post('/pass', function(req, res) {  //code to fetch the data from database 
     
 //  console.log(m,y);
    userData.find({},function(e,docs){
      // console.log(docs)     ;
        res.send(docs);

    });
});
//send mail with barcode
router.post('/send', function(req,res){
console.log(req.body.email); 
var transporter = nodemailer.createTransport({
    service: 'gmail',
     host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'myhub@aditya.ac.in',
        pass: 'Thub@123'
    }
});

var data= 'Adhaar: '+req.body.adhaar+'\n'
               +'First Name:'+req.body.first_name+'\n'+'Last Name: '+req.body.last_name
               +'\n'+'Mobile No: '+req.body.phone+'\n'+'Email: '+req.body.email+'\n'+'Address: '+req.body.address+'\n'+'City: '+req.body.city+'\n'+'State: '+req.body.state+'\n'
               +'Zip Code:'+req.body.zip+'\n'+'Gender:'+req.body.Gender+'\n'+'D.O.B:'+req.body.dob;
var first_name = req.body.first_name;
console.log(first_name);             
//var msg="<!DOCTYPE html><html><body><img id='barcode' src='https://api.qrserver.com/v1/create-qr-code/?data="+data+",\n"+mail+"&amp;size=250x250'title='HELLO' width='100' height='100' /></body></html>";
//var msg = "<!DOCTYPE html><html><head><meta name='viewport' content='width=device-width'><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'><title>VisitorPass Email</title><style type='text/css'>@media only screen and (max-width: 800px) {table[class=body] h1 {font-size: 28px !important;table[class=body] p,table[class=body] ul,table[class=body] ol,table[class=body] td,table[class=body] span,table[class=body] a {font-size: 16px !important; table[class=body] .wrapper,table[class=body] .article {padding: 10px !important; }table[class=body] .content {padding: 0 !important; }table[class=body] .container {padding: 0 !important;width: 100% !important; }table[class=body] .main {border-left-width: 0 !important;border-radius: 0 !important;border-right-width: 0 !important; }table[class=body] .btn table {width: 100% !important; }table[class=body] .btn a {width: 100% !important; }table[class=body] .img-responsive {height: auto !important;max-width: 100% !important;width: auto !important; }}@media all {.ExternalClass {width: 100%; }.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div {line-height: 100%; }.apple-link a {color: inherit !important;font-family: inherit !important;font-size: inherit !important;font-weight: inherit !important;line-height: inherit !important;text-decoration: none !important; }.btn-primary table td:hover {background-color: #34495e !important; }.btn-primary a:hover {background-color: #34495e !important;border-color: #34495e !important; } }.style1 {font-size: 9px}</style></head><body class='' style='background-color:#f6f6f6;font-family:sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;line-height:1.4;margin:0;padding:0;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;'><table border='0' cellpadding='0' cellspacing='0' class='body' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#f6f6f6;width:100%;'><tr><td style='font-family:sans-serif;font-size:14px;vertical-align:top;'>&nbsp;</td><td class='container' style='font-family:sans-serif;font-size:14px;vertical-align:top;display:block;max-width:580px;padding:10px;width:580px;Margin:0 auto !important;'><div class='content' style='box-sizing:border-box;display:block;Margin:0 auto;max-width:580px;padding:10px;'><!-- START CENTERED WHITE CONTAINER --><span class='preheader' style='color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;visibility:hidden;width:0;'></span><table class='main' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background:#fff;border-radius:3px;width:100%;'><tr><td class='wrapper' style='font-family:sans-serif;font-size:14px;vertical-align:top;box-sizing:border-box;padding:20px;'><table border='0' cellpadding='0' cellspacing='0' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;'><tr><td style='font-family:sans-serif;font-size:14px;vertical-align:top;'><p align='right' style='font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;'><img src='http://ecourses.aec.edu.in/thub/images/myhub_aditya.png' width='84' height='50' alt='AdityaLogo'><p style='font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;'>Hi"+" "+docs[i].employeename+",<p style='font-family:calibri;font-color:#295890;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;'>Please find your payslip for the month of"+" "+monthString+" "+year+" "+"attached with the mail.<p>Regards,<br><img src='http://ecourses.aec.edu.in/thub/images/myhublogo.png' width='84' height='50' alt='MyHubLogo'><br>Visitor Management System</p><br><img id='barcode' src='https://api.qrserver.com/v1/create-qr-code/?data="+data+",\n"+mail+"&amp;size=250x250'title='HELLO' width='100' height='100' /><p style='font-family:sans-serif;font-size:10px;font-weight:normal;margin:0;Margin-bottom:15px;'> Your PDF Payslip is delivered to your inbox, and you will be able to open the PDF attachment, only if you have Adobe reader version 7.0.8 and above. If Adobe Reader is not installed / upgraded in your PC. <a href='https://acrobat.adobe.com/in/en/acrobat/pdf-reader.html'>click here</a>.</p><div align='justify'><br></div><p style='font-family:sans-serif;font-size:10px;font-weight:normal;margin:0;Margin-bottom:15px;'>The information contained in this electronic message and any attachments to this message are intended for the exclusive use of the addressee(s) and may contain proprietary, confidential or privileged information. If you are not the intended recipient, you should not disseminate, distribute or copy this e-mail. Please notify the sender immediately and destroy all copies of this message and any attachments. WARNING: Computer viruses can be transmitted via email. The recipient should check this email and any attachments for the presence of viruses. The management accepts no liability for any damage caused by any virus transmitted by this email.</p><table border='0' cellpadding='0' cellspacing='0' class='btn btn-primary' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;box-sizing:border-box;width:100%;'><tbody><tr><td align='left' style='font-family:sans-serif;font-size:14px;vertical-align:top;padding-bottom:15px;'><center><table border='0' cellpadding='0' cellspacing='0' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;width:auto;'><tbody><tr><td style='font-family:sans-serif;font-size:14px;vertical-align:top;background-color:#ffffff;border-radius:5px;text-align:center;background-color:;'> </td></tr></tbody></table></center></td></tr></tbody></table><p style='font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;'></p><p style='font-family:sans-serif;font-size:11px;font-weight:normal;margin:0;Margin-bottom:15px;text-align:center;'>Have a Good Day!.</p></td></tr></table></td></tr></table><!-- START FOOTER --><div class='footer' style='clear:both;padding-top:10px;text-align:center;width:100%;'><table border='0' cellpadding='0' cellspacing='0' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;'><tr><td class='content-block' style='font-family:sans-serif;font-size:14px;vertical-align:top;color:#999999;font-size:12px;text-align:center;'><span class='apple-link' style='color:#999999;font-size:12px;text-align:center;'>Aditya Educational Institutions,Surampalem,533437</span><br>This email is system generated, please do not respond to this email.</td></tr><tr><td class='content-block powered-by' style='font-family:sans-serif;font-size:14px;vertical-align:top;color:#999999;font-size:12px;text-align:center;'>Powered by <a href='http://thub.ac.edu.in' style='color:#3498db;text-decoration:underline;color:#999999;font-size:12px;text-align:center;text-decoration:none;'>T-HUB team</a>.</td></tr></table></div><!-- END FOOTER --><!-- END CENTERED WHITE CONTAINER --></div></td><td style='font-family:sans-serif;font-size:14px;vertical-align:top;'>&nbsp;</td></tr></table></body></html>";
var msg= "<!DOCTYPE html><html><head><metaname='viewport'content='width=device-width'><meta httpequiv='Content-Type' content='text/html; charset=UTF-8'<title>Caste Verification</title><style type='text/css'>@media only screen and (max-width: 620px) {table[class=body] h1 {font-size: 28px !important;table[class=body] p,table[class=body] ul,table[class=body] ol,table[class=body] td,table[class=body] span,table[class=body] a {font-size: 16px !important; table[class=body] .wrapper,table[class=body] .article {padding: 10px !important; }table[class=body] .content {padding: 0 !important; }table[class=body] .container {padding: 0 !important;width: 100% !important; }table[class=body] .main {border-left-width: 0 !important;border-radius: 0 !important;border-right-width: 0 !important; }table[class=body] .btn table {width: 100% !important; }table[class=body] .btn a {width: 100% !important; }table[class=body] .img-responsive {height: auto !important;max-width: 100% !important;width: auto !important; }}@media all {.ExternalClass {width: 100%; }.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div {line-height: 100%; }.apple-link a {color: inherit !important;font-family: inherit !important;font-size: inherit !important;font-weight: inherit !important;line-height: inherit !important;text-decoration: none !important; }.btn-primary table td:hover {background-color: #34495e !important; }.btn-primary a:hover {background-color: #34495e !important;border-color: #34495e !important; } }</style></head><body class='' style='background-color:#f6f6f6;font-family:sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;line-height:1.4;margin:0;padding:0;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;'><table border='0' cellpadding='0' cellspacing='0' class='body' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#f6f6f6;width:100%;'><tr><td style='font-family:sans-serif;font-size:14px;vertical-align:top;'>&nbsp;</td><td class='container' style='font-family:sans-serif;font-size:14px;vertical-align:top;display:block;maxwidth:580px;padding:10px;width:580px;Margin:0 auto !important;'><div class='content' style='box-sizing:border-box;display:block;Margin:0 auto;max-width:580px;padding:10px;'><!-- START CENTERED WHITE CONTAINER --><span class='preheader' style='color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;visibility:hidden;width:0;'>This is preheader text. Some clients will show this text as a preview.</span><table class='main' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background:#fff;border-radius:3px;width:100%;'><tr><td class='wrapper' style='font-family:sans-serif;font-size:14px;vertical-align:top;box-sizing:border-box;padding:20px;'><table border='0' cellpadding='0' cellspacing='0' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;'><tr><td style='font-family:sans-serif;font-size:14px;vertical-align:top;'><p style='font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;'><b>Hello,"+first_name+"</b></p><p style='font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;'>Your request for Caste Certificate was <b>Approved</b>.<br> Here are the full details:</p> <center>  <img id='barcode' src='https://api.qrserver.com/v1/create-qr-code/?data="+data+"&amp;size=250x250'title='Qr-Code' width='100' height='100' /></center><table border='0' cellpadding='0' cellspacing='0' class='btn btn-primary' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;box-sizing:border-box;width:100%;'><tbody><tr><td align='left' style='font-family:sans-serif;font-size:14px;vertical-align:top;padding-bottom:15px;'><center><table border='0' cellpadding='0' cellspacing='0' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;width:auto;'><tbody><tr><td style='font-family:sans-serif;font-size:14px;vertical-align:top;background-color:#ffffff;border-radius:5px;text-align:center;background-color:;'></td></tr></tbody></table></center></td></tr></tbody></table><p style='font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;'>Have a Good Day!.</p></td></tr></table></td></tr></table><!-- START FOOTER --><div class='footer' style='clear:both;padding-top:10px;textalign:center;width:100%;'><table border='0' cellpadding='0' cellspacing='0' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;'><tr><td class='content-block' style='font-family:sans-serif;font-size:14px;vertical-align:top;color:#999999;font-size:12px;text-align:center;'><span class='apple-link' style='color:#999999;font-size:12px;text-align:center;'>Govt of Gujarat</span><br>This email is system generated, please do not respond to this email.</td></tr><tr><td class='content-block powered-by' style='font-family:sans-serif;font-size:14px;vertical-align:top;color:#999999;font-size:12px;text-align:center;'>Powered by <a href='#' style='color:#3498db;text-decoration:underline;color:#999999;font-size:12px;text-align:center;text-decoration:none;'>Team#six</a>.</td></tr</table></div><!-- END CENTERED WHITE CONTAINER --></div></td><td style='font-family:sans-serif;font-size:14px;vertical-align:top;'>&nbsp;</td></tr></table></body></html>"
var mailOptions = {
from: '"SIH " <myhub@aditya.ac.in>', // sender address
to: req.body.email, // list of receivers
subject: 'Caste Verification',
//text: msg // plaintext body
html: msg // html body
}
// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, response){
if(error){
res.send("Email could not sent due to error: "+error);
}else{
res.send("Email has been sent successfully");
}
});
});


// file upload by the admin
var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './public/upload')
        },
        filename: function (req, file, cb) {
            //var datetimestamp = Date.now();
            cb(null, file.originalname)
        }
});
var upload = multer({ //multer settings
                    storage: storage,
                    fileFilter : function(req, file, callback) { //file filter
                        if (['xls', 'xlsx', 'csv'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                            return callback(new Error('Wrong extension type'));
                        }
                        callback(null, true);
                    }
}).single('excel');
//excel upload
router.post('/fileUpload', function(req, res) {
        var exceltojson;
        upload(req,res,function(err){
            if(err){
                console.log(err);
                 // res.json({error_code:1,err_desc:err});
                 return;
            }
            /** Multer gives us file info in req.file object */
            if(!req.file){
                // res.json({error_code:1,err_desc:"No file passed"});
                console.log(req.file);
                return;
            }
            /** Check the extension of the incoming file and 
             *  use the appropriate module
             */
            if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
                exceltojson = xlsxtojson;
            } else {
                exceltojson = xlstojson;
            }
           // console.log(req.file.path);
            try {
                exceltojson({
                    input: req.file.path,
                    output: "out.json", //since we don't need output.json
                }, function(err,result){
                    if(err) {
                        return res.send('error in importing data');
                    } 
                    console.log(result);
                    saveData(result);
                    res.redirect("/admin");
            });
            } catch (e){
                res.send("Corupted excel file");
            } 
       });
});

function saveData(data) {
 //console.log(data);
for(var i=0;i<data.length;i++){
  //console.log(data[i].adhaar);
onlineCast.update({"adhaar":data[i].adhaar},{$set:{"adhaar":data[i].adhaar,"first_name":data[i].first_name,"last_name":data[i].last_name,"email":data[i].email,"phone":data[i].phone,"address":data[i].address,"city":data[i].city,"state":data[i].state,"zip_code":data[i].zip_code,"gender":data[i].gender,"MobileNo":data[i].MobileNo}},{upsert: true },  function(err, data ) { 
});

}
}//Ending of uploadin file 
// edit the record of an user
router.post('/edit_details', function(req, res){
  console.log(req.body.id);
  userData.find({"_id":req.body.id}, function(err, data){
    console.log(data);
    res.send(data);
  });

});
//edit data in admin page
router.post('/edit_data', function(req, res){
  var data = {
    adhaar : req.body.edit_adhaar,
    first_name : req.body.edit_first_name,
    last_name : req.body.edit_last_name,
    email : req.body.edit_email,
    phone : req.body.edit_phone,
    address : req.body.edit_address,
    city : req.body.edit_city,
    state : req.body.edit_state,
    zip_code : req.body.edit_zip,
    gender : req.body.edit_Gender
  };

  userData.update({"adhaar":req.body.edit_adhaar, "status":'verified'},{$set:data}, function(err, docs){
    if(docs)
    {
      res.redirect('/admin');
    }
    else{

      res.send('updatation file');

    }
  });
  
});
// verification of certificate by the user

router.post('/select', function(req, res){
  console.log(req.body.adhaar);
  userData.update({'adhaar':req.body.adhaar, 'status':'submited'},{$set:{status:'verified'}}, function(err, doc){
    if(doc)
    {

      console.log('updated');
    }
    else{
      req.send(err);
    }
  });

});
//Rejected by the admin
router.post('/select1', function(req, res){
  console.log(req.body.adhaar);
  userData.update({'adhaar':req.body.adhaar, 'status':'submited'},{$set:{status:'rejected'}}, function(err, doc){
    if(doc)
    {

      console.log('updated');
    }
    else{
      req.send(err);
    }
  });

});


// #########################   super admin part ###################
router.post('/super', function(req, res){
  var un = req.body.super_username;
    req.session.username=un;
  var pw = req.body.super_password;
  superadmin.findOne({username:un,password:pw}, function(err, docs){
    console.log(docs);
    if(!docs)
            {
          res.render('login',{error:'invalid username or password'});
            }
           else
          {
            delete docs.pass;
            req.session.username=un;
            req.session.username=docs;
          if( req.session.username=="superadmin"){
            res.render('super');
          }
res.redirect('/super');
          }
});
});

router.post('/findcertificate', function(req, res) {
  if (req.session && req.session.username) {
  var  No=req.body.No;
  //console.log(No);
  userData.find({"adhaar":No},function(err,data){
    if(err)
            console.log(err);
          else
          {
            res.locals.member = data;
            console.log(data);
            res.send(data);
          }
  });
}
});
//super admin logout
router.get('/adminlogout', function(req, res){
  if(req.session && req.session.username){
  console.log(req.session.username.username);
  req.session.reset();
  res.redirect('/login');
}
});
router.post('/contact',function(req,res){
  var data = {
    firstname:req.body.name,
    Secondname:req.body.sname,
    Email:req.body.email,
    Phone_number:req.body.phone,
    Feedback:req.body.feedback
  }
  contact.insert(data,function(err,docs){
    console.log(docs);
    res.render('contact');
  });

});
// Image reading in super admin

router.post('/imageRead', function(req,res){
  data={
    name : req.body.name,
    father : req.body.father,
    vill : req.body.vill,
    mandal : req.body.mandal,
    state : req.body.state,
    phone : req.body.phone,
    caste : req.body.caste,
    pin_code: req.body.pin_code
  }
  //console.log(data);
  onlineCast.find(data,function(err, doc){
    if(doc)
    {

      res.send(doc);
    }
    else{
      console.log(err);
    }
  });
});

module.exports = router;
