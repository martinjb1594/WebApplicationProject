// var http = require('http'),
//     path = require('path'),
//     express = require('express'),
//     bodyParser = require('body-parser'),
//     fs = require('fs'),
//     js2xmlparser = require('js2xmlparser'),
//     libxslt = require('libxslt');

// var router = express();
// var server = http.createServer(router);

// router.use(express.static(path.resolve(__dirname, 'views')));
// router.use(bodyParser.urlencoded({extended: true}));
// router.use(bodyParser.json());




// // GET request to dislay index.html located inside /views folder
// router.get('/', function(req, res) {
//   res.render('index');
// });

// // HTML produced by XSL Transformation
// router.get('/get/html', function(req, res) {
  
//     res.writeHead(200, { 'Content-Type': 'text/html' });
    
//     var docSource = fs.readFileSync('views/Locations.xml', 'utf8');
//     var stylesheetSource = fs.readFileSync('Locations.xsl', 'utf8');
    
//     var doc = libxslt.libxmljs.parseXml(docSource);
//     var stylesheet = libxslt.parse(stylesheetSource);
    
//     var result = stylesheet.apply(doc);
    
//     res.end(result.toString());
  
// });

// // POST request to add to JSON & XML files
// router.post('/post/json', function(req, res) {

//   // Function to read in a JSON file, add to it & convert to XML
//   function appendJSON(obj) {

//     // Read in a JSON file
//     var JSONfile = fs.readFileSync('Locations.json', 'utf8');

//     // Parse the JSON file in order to be able to edit it 
//     var JSONparsed = JSON.parse(JSONfile);

//     // Add a new record into country array within the JSON file    
//     JSONparsed.location.push(obj);

//     // Beautify the resulting JSON file
//     var JSONformated = JSON.stringify(JSONparsed, null, 4);

//     // Write the updated JSON file back to the system 
//     fs.writeFileSync('Locations.json', JSONformated);

//     // Convert the updated JSON file to XML     
//     var XMLformated = js2xmlparser.parse("locations", JSON.parse(JSONformated));

//     // Write the resulting XML back to the system
//     fs.writeFileSync('views/Locations.xml', XMLformated);

//   }

//   // Call appendJSON function and pass in body of the current POST request
//   appendJSON(req.body);
  
//   // Re-direct the browser back to the page, where the POST request came from
//   res.redirect('back');

// });

// server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
//   var addr = server.address();
//   console.log("Server listening at", addr.address + ":" + addr.port);
// });

var http = require('http'),
  path = require('path'),
  express = require('express'),
  bodyParser = require('body-parser'),
  fs = require('fs'),
  xml2js = require('xml2js'),
  libxslt = require('libxslt');

var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'views')));
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

// GET request to dislay index.html located inside /views folder
router.get('/', function(req, res) {
  res.render('index');
});

// HTML produced by XSL Transformation
router.get('/get/html', function(req, res) {

  res.writeHead(200, {
    'Content-Type': 'text/html'
  });

  var docSource = fs.readFileSync('Locations.xml', 'utf8');
  var stylesheetSource = fs.readFileSync('Locations.xsl', 'utf8');

  var doc = libxslt.libxmljs.parseXml(docSource);
  var stylesheet = libxslt.parse(stylesheetSource);

  var result = stylesheet.apply(doc);

  res.end(result.toString());

});

// POST request to add to JSON & XML files
router.post('/post/json', function(req, res) {

  // Function to read in XML file and convert it to JSON
  function xmlFileToJs(filename, cb) {
    var filepath = path.normalize(path.join(__dirname, filename));
    fs.readFile(filepath, 'utf8', function(err, xmlStr) {
      if (err) throw (err);
      xml2js.parseString(xmlStr, {}, cb);
    });
  }

//   //Function to convert JSON to XML and save it
//   function jsToXmlFile(filename, obj, cb) {
//     var filepath = path.normalize(path.join(__dirname, filename));
//     var builder = new xml2js.Builder();
//     var xml = builder.buildObject(obj);
//     fs.writeFile(filepath, xml, cb);
//   }

//   // Function to read in a JSON file, add to it & convert to XML
//   function appendJSON(obj) {

//     // Function to read in XML file, convert it to JSON, add a new object and write back to XML file
//     xmlFileToJs('Locations.xml', function(err, result) {
//       if (err) throw (err);
//       result.countries.country.push(obj);
//       jsToXmlFile('Locations.xml', result, function(err) {
//         if (err) console.log(err);
//       })
//     })
//   }

  // Call appendJSON function and pass in body of the current POST request
  appendJSON(req.body);

  // Re-direct the browser back to the page, where the POST request came from
  res.redirect('back');

});

// POST request to add to JSON & XML files
router.post('/post/delete', function(req, res) {

  // Function to read in XML file and convert it to JSON
  function xmlFileToJs(filename, cb) {
    var filepath = path.normalize(path.join(__dirname, filename));
    fs.readFile(filepath, 'utf8', function(err, xmlStr) {
      if (err) throw (err);
      xml2js.parseString(xmlStr, {}, cb);
    });
  }

  //Function to convert JSON to XML and save it
  function jsToXmlFile(filename, obj, cb) {
    var filepath = path.normalize(path.join(__dirname, filename));
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(obj);
    fs.writeFile(filepath, xml, cb);
  }

  // Function to read in a JSON file, add to it & convert to XML
  function deleteJSON(obj) {

    console.log(obj);
    // Function to read in XML file, convert it to JSON, add a new object and write back to XML file
    xmlFileToJs('Locations.xml', function(err, result) {
      if (err) throw (err);
     
      for( var i in result.locations ) {
            delete result.locations.location[obj.row-1]
      }
      
      jsToXmlFile('Locations.xml', result, function(err) {
        if (err) console.log(err);
      })
    })
  }

  // Call appendJSON function and pass in body of the current POST request
  deleteJSON(req.body);

  // Re-direct the browser back to the page, where the POST request came from
  res.redirect('back');

});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});










