// server.js
// where your node app starts

// init project
var express = require('express');
const bodyParser = require('body-parser');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html

app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  const inputDate = new Date(req.params.date)
  Date.prototype.isValid = () => {
    return inputDate.getTime() === inputDate.getTime()
  }
  if (!req.params.date) {
    res.json({
      "unix": new Date().getTime(),
      "utc": new Date().toUTCString()
    })
  }
  else{
    if(inputDate.isValid())
    {
      
      res.status(200).json({
        "unix":inputDate.getTime(),
        "utc":inputDate.toUTCString()
      })
    }
    else{
      res.json(
        {
          "error":"Invalid date"
        }
      )
    }
  }
  
  // const inputDate = new Date()
 
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
