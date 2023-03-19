const express = require("express");
const session = require("express-session");
const path = require("path");
var bodyParser = require('body-parser');

const app = express();
const http = app.listen(3000);
app.set('view engine', 'pug')
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'))) 
app.use('/views', express.static(path.join(__dirname, "views")))
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules'))) 

// app.use(
//     bodyParser.urlencoded({
//       extended: false,
//     })
//   );

app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    //console.log('curent page is:' + configAndStatus.net.DHCP);
    //console.log('status error'+res.stats.error)
    res.render("home",{
      pageName: "home",
    });
  });