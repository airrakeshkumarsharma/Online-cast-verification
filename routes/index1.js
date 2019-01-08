var express = require('express');
var router = express.Router();
var monk = require('monk');
var dbs = monk('localhost:27017/sihSample');
var sih = dbs.get('user'); // collection name of user
var userData = dbs.get('userData'); // collection of userDat
var randomstring = require('randomstring'); // random number generation 
var adminLogin = dbs.get('admin');          //Admin data base
var onlineCast = dbs.get('onlineCast');   // finally uploaded by the officer
var nodemailer = require('nodemailer'); // node mailer package
var email = require('emailjs');    // email package for sending email
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
router.get('/updateCast', function(req, res){
	res.render('user/updateCast');
});
router.get('/admin', function(req,res){
     onlineCast.find({}, function(err,doc){
      res.locals.user=doc;
    console.log(doc);
      res.render('admin/adminPage');
   });

});
router.post('/add', function(req, res){
	res.render('admin/add');
});


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
		//console.log(doc);
		res.redirect('/login');
	});

});


// user login form 

router.post('/user', function(req, res){
	// console.log(req.body.username);
	// console.log(req.body.password);
		var username = req.body.email;
		var password = req.body.password;

	sih.findOne({email:username, password:password}, function(err, doc){
		if (!doc) {
			res.redirect('/login');
		}
		else{
			res.render('user/userHome');
		}
	});

});

router.post('/forgot', function(req, res){
	// console.log(req.body.adhaar);
	// console.log(req.body.email);
	var adhaarCard = req.body.adhaar;
	var emailId = req.body.email;


	// check data is exist or not in data base
	sih.find({adhaar:adhaarCard, email:emailId}, function(err, data){
    console.log(data);
		//checking the data from frontend and backend
		if(data.length != 0){
			var newpassword = randomstring.generate(6);
			for(i=0; i<data.length; i++)
				var Datas=data;
			for(i=0;i<Datas.length;i++){
        console.log(Datas[i].email);
			    if(Datas[i].email==req.body.email){
			     res.send("success");
			     var name=Datas[i].user;
			     console.log(Datas[i].user);
			     console.log(name);
				  }
				  else{
				    console.log("not found");
				    res.send("Email not Found");
				  }
      }
    }else
		{
		  console.log("not found");
		    res.send("Email not Found");

		}
    var newpassword = randomstring.generate(7);
	  console.log(newpassword);
	  console.log(name);
  sih.update({"adhaar":req.body.adhaar},{$set:{"adhaar":req.body.adhaar,"password":newpassword}},function(err,user){
    if(!user){
      console.log('error');

    }
    else{

      var server  = email.server.connect({
                                 user:    "sandy.sid4u@gmail.com",
                                 password:"jyothsna",
                                 host:    "smtp.gmail.com",
                                 ssl:     true
                              });
                                var msg="";
                                  msg += "<html><body class=\"\" style=\"\/* background-color: #7acbee; *\/font-family:sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;line-height:1.4;margin:0;padding:0;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"body\" style=\"border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background-color: #7acbee;width:100%;\"><tbody><tr><td style=\"font-family:sans-serif;font-size:14px;vertical-align:top;\">&nbsp;<\/td><td class=\"container\" style=\"font-family:sans-serif;font-size:14px;vertical-align:top;display:block;max-width:580px;padding:10px;width:580px;Margin:0 auto !important;\"><div class=\"content\" style=\"box-sizing:border-box;display:block;Margin:0 auto;max-width:580px;padding:10px;\"><!-- START CENTERED WHITE CONTAINER --><span class=\"preheader\" style=\"color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;visibility:hidden;width:0;\"><\/span><table class=\"main\" style=\"border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background:#fff;border-radius:3px;width:100%;\"><tbody><tr><td class=\"wrapper\" style=\"font-family:sans-serif;font-size:14px;vertical-align:top;box-sizing:border-box;padding:20px;\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;\"><tbody><tr><td style=\"font-family:sans-serif;font-size:14px;vertical-align:top;\"><p style=\"font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;margin-left: 210px;\"><img src='http:\/\/myhub.aec.edu.in\/myhub.jpg' width=\"80px\"><\/p><p style=\"font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;\">Hi "+name+", <br><br>Your new password is <b>"+newpassword+"<\/b><\/p><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"btn btn-primary\" style=\"border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;box-sizing:border-box;width:100%;\"><tbody><tr><td align=\"left\" style=\"font-family:sans-serif;font-size:14px;vertical-align:top;\"><center><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;width:auto;\"><tbody><tr><td style=\"font-family:sans-serif;font-size:14px;vertical-align:top;background-color:#ffffff;border-radius:5px;text-align:center;background-color:;\"><\/td><\/tr><\/tbody><\/table><\/center><\/td><\/tr><\/tbody><\/table><p style=\"font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;\"><\/p><center><b><\/b><\/center><p><\/p><p style=\"font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;\">Thanks &amp; Regards,<br>Aditya&#39;s myHUB.<\/p><\/td><\/tr><\/tbody><\/table><\/td><\/tr><\/tbody><\/table><!-- START FOOTER --><div class=\"footer\" style=\"clear:both;padding-top:10px;text-align:center;width:100%;\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;\"><tbody><tr><td class=\"content-block\" style=\"font-family:sans-serif;font-size:14px;vertical-align:top;color: #000000;font-size:12px;text-align:center;\"><span class=\"apple-link\" style=\"color: #000000;font-size:12px;text-align:center;\">Aditya Group of Educational Institutions,Surampalem<\/span><br>This email is system generated, please do not respond to this email.<\/td><\/tr><tr><td class=\"content-block powered-by\" style=\"font-family:sans-serif;font-size:14px;vertical-align:top;color: black;font-size:12px;text-align:center;\">Powered by T-HUB. <br><a href='http:\/\/www.technicalhub.io' target=\"_blank\" style=\"color:white;\" >www.technicalhub.io<\/a><\/td><\/tr><\/tbody><\/table><\/div><!-- END FOOTER --><!-- END CENTERED WHITE CONTAINER --><\/div><\/td><td style=\"font-family:sans-serif;font-size:14px;vertical-align:top;\">&nbsp;<\/td><\/tr><\/tbody><\/table><\/body><\/html>";


                                //console.log(qrdata);

                              var message = {
                                 text:    msg,
                                 from:    "SIH<sandy.sid4ugmail.com>",
                                 to:      req.body.email,  // change mail for faculty
                                 cc:      "",
                                 subject: "New password",
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


        }
      });
  });
});
////////////////////////////////////////////////////////////
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
//Newsrepoort
router.post('/updateCast',upload, function(req, res) {
  var data = {
	 	adhaar: req.body.adhaar,
	 	mobile:	req.body.mobile,
	 	name:	req.body.name,
	 	father:	req.body.fatherName,
	 	mother:	req.body.MotherName,
	 	address: req.body.address,
	 	district: req.body.district,
	 	fileName: req.file.originalname
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
})
res.render('user/updateCast');
});

// login for admin page

router.post('/adminpage', function(req, res){

    var data={
      username:req.body.email,
      password:req.body.password
    }



    adminLogin.findOne(data, function(err,docs){
      if(docs)
      {
        res.send('success');
      }
      else{
        res.send('<h2 style="color:red">Credentials error</h2>');
        // console.log(err);
      }
    });

  // console.log(req.body.email);
  // console.log(req.body.password);
  // res.send('data is sent');
});


// #################################Admin part ###################################




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

  };
   onlineCast.insert(data, function(err, data){
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
})
res.render('admin/adminPage');
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
    //console.log(data);
    //if(err)
    //console.log(err);

});

}
}//Ending of uploadin file 

// edit the record of an user

router.post('/edit_details', function(req, res){
  console.log(id);
});


module.exports = router;
