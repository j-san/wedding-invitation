
var express = require('express'),
    app = express(),
    port = process.env.PORT || 1337,
    email = require("emailjs");

app.configure(function () {
    app.use(express.bodyParser());
    app.use(app.router);
    app.use(express.static(__dirname + "/files/"));
});



app.get('/', function home (req, res, next) {
    req.path = "/index.html";
    next();
});

app.post('/subscribe', function subscribe (req, res, next) {
    var str = "";
    for (var i in req.body) {
        str += i + " = " + req.body[i] + "\n";
    }
    sendEmail(str);
    res.redirect("/successful.html");
});


app.listen(port);
console.log("Server running");

function sendEmail(body) {
    console.log("--------------------");
    console.log("Sending email");
    console.log(body);

    var server = email.server.connect({
       user:     process.env.SMTP_LOGIN, 
       password: process.env.SMTP_PASSWORD, 
       host:     process.env.SMTP_HOST, 
       ssl:      true
    });

    server.send({
       from:    process.env.EMAIL_FROM, 
       to:      process.env.EMAIL_TO,
       subject: "notification: wedding invitation subscribed",
       text:    body
    }, function(err, message) {
        if (err) { 
            console.log(err); 
        } else { 
            console.log("message sent successuly"); 
        }
    });
}
