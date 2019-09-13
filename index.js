var http =require('http');
var express = require('express');
var mongoose = require('mongoose');
var countryCtrl = require('./controllers/country.ctrl');
var countryRouter = require('./routers/country.router');
var userCtrl = require('./controllers/user.ctrl');
var userRouter = require('./routers/user.router');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const cors = require("cors");   

var app = express();
app.use(cors());
var port = process.env.PORT|| 3000;
app.use(bodyParser.json());
app.listen(port,function(){
    console.log("Server started");
});
mongoose.connection.openUri("mongodb://admin1:admin1@ds127958.mlab.com:27958/country",{ useNewUrlParser: true } );
function authentication(req,res,next){
    var user = jwt.verify(req.headers['authorization'],'secret',function(err,decode){
        if (!err ){
            res.status(200);
            next();
        }else{
            res.status(401);
            res.send("Unauthorized");
        }
    });
}
app.use('/api/users',userRouter);
app.use(authentication);
app.use('/api/country',countryRouter);