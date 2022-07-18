const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const client = require("@mailchimp/mailchimp_marketing");



app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html")
});

client.setConfig({apiKey: "abdcb9a393db125bf58f994f1f9cd8f9-us20",  server: "us20",});


app.post("/", function(req, res){

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  console.log(firstName, lastName, email);

  const subscribingUser = {firstName: firstName, lastName: lastName, email: email};

  const run = async () => {
    try {
        const response = await client.lists.addListMember("c558faa776", {
          email_address: subscribingUser.email,
          status: "subscribed",
          merge_fields: {
              FNAME: subscribingUser.firstName,
              LNAME: subscribingUser.lastName
          }
        });
        console.log(response);
        res.sendFile(__dirname + "/success.html")
         // (optional)
       } catch (err) {
           console.log(err.status)
           res.sendFile(__dirname + "/failure.html")
         }
      };


  run();
});

app.post("failure", function(req, res) {
  res.redirect("/")
});



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, function(){
  console.log("Server is running on port 3000");
});


//API key
//abdcb9a393db125bf58f994f1f9cd8f9-us20

//list id
//c558faa776
