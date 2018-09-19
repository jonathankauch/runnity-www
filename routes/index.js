var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session.userToken){
	var session = req.session;
	var requestUrlEvents = 'http://localhost:3000/users/' + session.userId + '/events/?token=' + session.userToken;
	var requestUrlRuns = 'http://localhost:3000/users/' + session.userId + '/runs/?token=' + session.userToken;
	console.log(requestUrlEvents, requestUrlRuns);
	request(requestUrlEvents, function (error, response, body) {
			if (!error && response.statusCode == 200) {
					body_events = JSON.parse(body);
					console.log('events', body_events);
			}
			request(requestUrlRuns, function (error, response, body) {
					if (!error && response.statusCode == 200) {
							body_runs = JSON.parse(body);
							console.log('runs', body_runs);
					}
					if (!body_events && !body_runs){
						res.render('index', {
							title: 'home',
							userToken: session.userToken,
							firstname: session.firstname,
							lastname: session.lastname
					});
					}
					else {
						res.render('index', {
							title: 'home',
							events: body_events,
							runs: body_runs,
							userToken: session.userToken,
							firstname: session.firstname,
							lastname: session.lastname
					});
				}
		})
	})
}
else{
	res.render('index', { title: 'home'});
}
});

router.get('/signup', function(req, res, next) {
	if (req.session.userToken){
		res.redirect('/');
	}
	else{
  res.render('signup', { title: 'signup' });
}
});

router.get('/login', function(req, res, next) {
	if (req.session.userToken){
		res.redirect('/');
	}
	else{
  res.render('login', { title: 'login' });
}
});

router.post('/login', function(req, res) {
	var email = req.body.email;
	var password = req.body.password;

	request.post({
		url: 'http://localhost:3000/users/login',
		form: {
			email: email,
			password: password
		}
	}, function(err, response, body) {
		if (!err && response.statusCode == 200){
			body = JSON.parse(body);
			req.session.userToken = body.user.token;
			req.session.userId = body.user.id;
			req.session.firstname = body.user.firstname;
			req.session.lastname = body.user.lastname;
			res.redirect('/');
		}
		else {
			res.redirect('/signup');
		}
	});
});

router.post('/signup', function(req, res) {
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var email = req.body.email;
	var password = req.body.password;
	var confirmPassword = req.body.confirmPassword;

	if (password !== confirmPassword) {
		return;
	}
	request.post('http://localhost:3000/register')
		.form({
			firstname: firstname,
			lastname: lastname,
			email: email,
			password: password
		});
	res.redirect('/login');
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'about' });
});

router.get('/Events', function(req, res, next) {
	if (req.session.userToken){
	var session = req.session;
  request('http://localhost:3000/events', function (error, response, body) {
      if (!error && response.statusCode == 200) {
          body = JSON.parse(body);
          console.log('body', body);
					res.render('events', {results: body.data, title: 'event', userToken: session.userToken});
      }
    })
	}
	else {
		res.redirect('/');
	}
});

router.get('/logout', function(req, res) {
	delete req.session.userToken;
	res.redirect('/');
});

module.exports = router;
