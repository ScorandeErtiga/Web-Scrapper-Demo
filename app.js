/////////////////////////////Require Packages//////////////////////////////////
const express = require("express");
const schedule = require("node-schedule");
const bodyParser = require("body-parser");
const scrapper = require("./components/scrapper.js")
const mailer = require("./components/mailer.js")

/////////////////////////////Initializing packages and settings////////////////////
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const mailOptions = {

  from: 'youremail@gmail.com',
  to: 'abhishekpandey1880@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

/////////////////////////////Handling requests/////////////////////////////////

app.get("/", function(req, res) {
	
	// mailer.sendMail(mailOptions, function(err, info){
	// 	if(err) console.log(err);
	// 	else console.log("Mail Sent!!!");
	// });
	res.render("home", {});
});

app.post("/", function(req, res) {

	const link = req.body.email;
	res.render("link", {});
});

app.post("/link", async function(req, res) {

	const link = req.body.link;
	var price = await scrapper.getPrice(link);
	res.render("user", {link: link, price: price});
});



/////////////////////////////Sheduler//////////////////////////////////////////

/* Scheduler which runs at 2:30am and 2:30pm always */
// var rule = new schedule.RecurrenceRule();
// 	rule.second = 0;
// 	rule.minute = 30;
// 	rule.hour = [2,14];
// 	var j = schedule.scheduleJob(rule, function(){
//  	 	console.log("schedule");
// 	});
// 	j.schedule();

/////////////////////////////Spining up the server/////////////////////////////
app.listen(3000, function() {
	console.log("Server is running on port 3000");
});