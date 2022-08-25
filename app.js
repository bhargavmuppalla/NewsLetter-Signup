const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function(request, response){
  response.sendFile(__dirname+"/signup.html");
});

app.post("/", function(request,response){
  var firstName = request.body.FirstName;
  var lastName = request.body.LastName;
  var email = request.body.Email;

  var data = {
    members: [
      {
        email_address : email,
        status : "subscribed",
        merge_fields :{
          FNAME : firstName,
          LNAME : lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);
  //console.log(jsonData);
  const url = "https://us8.api.mailchimp.com/3.0/lists/d5cedec63c";

  var options = {
    method : "POST",
    auth : "apikey:c2c75903765b91e8205411b159bbf97e-us8"
  }

  const req = https.request(url, options, function(res){
    if(res.statusCode == 200){
      response.sendFile(__dirname+"/success.html")
    }
    else{
      response.sendFile(__dirname+"/failure.html");
    }
  })

  req.write(jsonData);
  req.end();

});

app.post("/failure", function(request, response){
  response.redirect("/");
})

app.listen(process.env.PORT || 3000, function(request,response){
  console.log("server runnning on port 3000");
});

//API Key
//c2c75903765b91e8205411b159bbf97e-us8

//list id
//d5cedec63c
