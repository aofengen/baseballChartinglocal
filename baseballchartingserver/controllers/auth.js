const router = require('express').Router();
const sequelize = require('../db.js');
const User = sequelize.import('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = function(req, res){
	let email = req.body.user.email;
	let username = req.body.user.username;
	let pass = req.body.user.password;
	//need to create a user object and use sequelize to put that user into our database.
	User.create({
		email: email,
		username: username,
		passwordhash: bcrypt.hashSync(pass, 10)
	}).then(
		//Sequelize is going to return the object it created from db.
		function createSuccess(user){
			let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
			res.json({
				user: user,
				message: 'create',
				sessionToken: token 
			});
		},
		function createError(err){
			res.send(500, err.message);
		}
	);
};

exports.signin = function(req, res){
	User.findOne({where: {email:req.body.user.email}}).then(
		function(user){
			if(user) { 
				bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches){
				if(matches){
					let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
					res.json({
						user: user,
						message: "successfully authenticated",
						sessionToken: token
					});
				} else {
					res.status(500). send({error:"failed to identicate"});
				}
			});
		} else {
				res.status(500).send({error:"failed to authenticate"});
			}
		},
		function(err) {
			res.json(err);
		}
	);
};

// module.exports = router;