'use strict';
var express = require('express');
var app = express();

// Loading modules
var http = require('http').Server(app);
var fs = require('fs');
var path = require('path');

//websocket handler
var io = require('socket.io')(http);

//form handlers
var bodyParser = require('body-parser');
var multer = require('multer');


//async for parallels functions
var async = require('async');


// image module : covering saving,naming,filtering,cropping,resizing... everything
var imageSaver = require('./imageSaver_module');

//configuring imageSaver.imageFormat
imageSaver.imageFormat.setDirectoryPath('./public/uploads/');
imageSaver.imageFormat.setExpectedImageSize(200,150);

//configuring imageSaver.nameManager
imageSaver.nameManager.setRawExtension('-r');
imageSaver.nameManager.setFormatedExtension('-f');
imageSaver.nameManager.setFilteredExtension('-m');
imageSaver.nameManager.setDirectory('/uploads/');

//Configuring modules
app.set('view engine', 'jade');
app.set('views', __dirname + '/public/views');
app.use(multer({dest: './uploads/'}));
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));


// CONFIG
app.set('port','9000');





// URLS management
app.get('/',function(req,res){
    // your response here
});



http.listen(app.get('port'), function () {
    console.log('listening on *:'+app.get('port'));
});

