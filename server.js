var formidable = require('formidable');
var express = require('express');
var fs = require('fs');
var app = express();
var path = require('path');

app.use(express.static(__dirname));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, content-type");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.post('/upload', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var dir = 'uploads';

        fs.mkdir(dir, function (err) {
            fs
                .readFile(files.RemoteFile.path, function (err, data) {
                    // save file from temp dir to new dir
                    var fileName = path.join(__dirname, dir, files.RemoteFile.name);
                    console.log(fileName);
                    fs.writeFile(fileName, data, function (err) {
                        if (err) 
                            throw err;
                        
                        res.json({success: 'true'});
                    });
                });
        });

    });
});

var server = app.listen(2017, function () {
    var host = server
        .address()
        .address;
    var port = server
        .address()
        .port;
    console.log('listening at http://%s:%s', host, port);
});