var express = require('express');
var fs = require('fs');
var app = express();
const path = require('path');

app.set('view engine', 'ejs');

app.get('/', function(req, res) {

  function getFiles (dir, files_){
      files_ = files_ || [];
      var files = fs.readdirSync(dir);
      for (var i in files){
          var name = dir + '/' + files[i];
          if (fs.statSync(name).isDirectory()){
              getFiles(name, files_);
          } else {
              files_.push(files[i]);
          }
      }
      return files_;
  }

  res.render('index', {
      files: getFiles('data')
  });

});

app.get('/:term', function(req, res) {
  var dataDirectory = 'data/' + req.params.term + '.json';
  var filePath = path.join(__dirname, dataDirectory);

  if (!fs.existsSync(dataDirectory)){
      console.log("no data found for the term: " + req.params.term);
  }

  fs.readFile(filePath, {encoding: 'utf8'}, function(err,data){
      if (!err){
      jsonData = JSON.parse(data);
      res.render('bar', {
          sentimentScores: jsonData,
          searchText: req.params.term
      });
      }else{
          console.log(err);
      }
  });

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
