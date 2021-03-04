var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const Users = require('../model/user');
const config = require('../config/config');
const verifyToken = require('../config/verify_token');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/register', function(req, res, next) {

	let user = new Users({
		username:req.body.username,
		first_name:req.body.first_name,
		last_name:req.body.last_name,
		email:req.body.email,
		contact_no:req.body.contact_no,
		password:bcrypt.hashSync(req.body.password,10),
	});

	let result = user.save();

	res.status(200).json({result:result});

});

router.post('/login', function(req, res, next) {
	// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
	let promise = Users.findOne({email:req.body.email});

		promise.then((doc) => {
			if(doc){
				let validpassword = bcrypt.compareSync(req.body.password,doc.password);

				if(!validpassword)
				{
					return res.status(404).json({msg:'Password is not valid'});
				}else{
					let secret = "mysecrt";

					let token = jwt.sign({ id:doc._id }, secret,{ expiresIn: '1d' });

					return res.status(201).json({token:token,result:doc});
				}
			}

		});

});


router.get('/tokenverify',verifyToken,(req,res,next)=>{
	return res.status(201).json(config.mytoken);

});

// router.get('/isLoggedIn')

module.exports = router;
