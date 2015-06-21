# ImageManager 

ImageManager is a stack created to help store images with `imageManager` module.

imageManager is written on top of `gm`(https://github.com/aheckmann/gm) for maximum efficiency.

## API

#### Installation

`$ npm install`

#### Usage

```js
var express = require('express');
var imageManager = require('./imageManager_module');

var app = express();

```

You have to define first the required parameters of the `imageManager` dependencies to fully use it:

```js
//configuring imageManager.imageFormat

// destination of images uploaded on server
imageManager.imageFormat.setDirectoryPath('./your/path/to/dir');

// set desired width and height of formated image
imageManager.imageFormat.setExpectedImageSize(desiredImageWidth,desiredImageHeight);



//configuring imageManager.nameManager

// will create "nameOfYourImage-extension.jpg" for instance
imageManager.nameManager.setRawExtension('-r');
imageManager.nameManager.setFormatedExtension('-f');
imageManager.nameManager.setFilteredExtension('-m');

// required to create absolute url to your image
imageManager.nameManager.setDirectory('/uploads/');
```

It is highly recommended to use `multer`(https://github.com/expressjs/multer) or `body-parser`(https://github.com/expressjs/body-parser) to handle `multipart/form-data`.



## imageManager

imageManager is a module built with to mandatory dependencies present in the stack : `imageFormat` and `nameManager`


imageManager will allow you to store an image. For example :
```js
app.post('/upload', function (req, res) {
	imageManager.saveNewRawImage(req,callback);
}
```
If you want to store both raw and formated image, it is recommended to use `async`(https://github.com/caolan/async) for better performances:

```js
async.parallel([
	function (callback) {
		imageManager.saveNewRawImage(req,callback)
	},
    function (callback) {				                               
	    imageManager.saveNewFormatedImage(req,callback)
    }
],function(data){
	// your callback
});
```
## imageManager.imageFormat

This module allows you to apply some filters to an image. The following filters are available for now : 


* `setMonochromeImage(imagePath, filteredName, callback)`
* `setCharcoalImage(imagePath, filteredName, callback)`
* `setLowColorImage(imagePath, filteredName, callback)`
* `setNegativeImage(imagePath, filteredName, callback)`
* `setSepiaImage(imagePath, filteredName, callback)`
* `setColorizedImage(imagePath, filteredName, callback)`

For example : 
```js
var imageName = "yourImageName"
imageManager.imageFormat.setSepiaImage(imageManager.imageFormat.dirPath + imageManager.nameManager.getFormatedName(imageName), imageManager.nameManager.getFilteredName(imageName), function (err, data) {
	// your callback
});
```

The whole module documentation is available on this link : http://thomas-haddad.com/imageManager/
