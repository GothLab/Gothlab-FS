//  json2.js
//  2023-05-10
//  Public Domain.
//  NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

//  USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
//  NOT CONTROL.

//  This file creates a global JSON object containing two methods: stringify
//  and parse. This file provides the ES5 JSON capability to ES3 systems.
//  If a project might run on IE8 or earlier, then this file should be included.
//  This file does nothing on ES5 systems.

//      JSON.stringify(value, replacer, space)
//          value       any JavaScript value, usually an object or array.
//          replacer    an optional parameter that determines how object
//                      values are stringified for objects. It can be a
//                      function or an array of strings.
//          space       an optional parameter that specifies the indentation
//                      of nested structures. If it is omitted, the text will
//                      be packed without extra whitespace. If it is a number,
//                      it will specify the number of spaces to indent at each
//                      level. If it is a string (such as "\t" or "&nbsp;"),
//                      it contains the characters used to indent at each level.
//          This method produces a JSON text from a JavaScript value.
//          When an object value is found, if the object contains a toJSON
//          method, its toJSON method will be called and the result will be
//          stringified. A toJSON method does not serialize: it returns the
//          value represented by the name/value pair that should be serialized,
//          or undefined if nothing should be serialized. The toJSON method
//          will be passed the key associated with the value, and this will be
//          bound to the value.

//          For example, this would serialize Dates as ISO strings.

//              Date.prototype.toJSON = function (key) {
//                  function f(n) {
//                      // Format integers to have at least two digits.
//                      return (n < 10)
//                          ? "0" + n
//                          : n;
//                  }
//                  return this.getUTCFullYear()   + "-" +
//                       f(this.getUTCMonth() + 1) + "-" +
//                       f(this.getUTCDate())      + "T" +
//                       f(this.getUTCHours())     + ":" +
//                       f(this.getUTCMinutes())   + ":" +
//                       f(this.getUTCSeconds())   + "Z";
//              };

//          You can provide an optional replacer method. It will be passed the
//          key and value of each member, with this bound to the containing
//          object. The value that is returned from your method will be
//          serialized. If your method returns undefined, then the member will
//          be excluded from the serialization.

//          If the replacer parameter is an array of strings, then it will be
//          used to select the members to be serialized. It filters the results
//          such that only members with keys listed in the replacer array are
//          stringified.

//          Values that do not have JSON representations, such as undefined or
//          functions, will not be serialized. Such values in objects will be
//          dropped; in arrays they will be replaced with null. You can use
//          a replacer function to replace those with JSON values.

//          JSON.stringify(undefined) returns undefined.

//          The optional space parameter produces a stringification of the
//          value that is filled with line breaks and indentation to make it
//          easier to read.

//          If the space parameter is a non-empty string, then that string will
//          be used for indentation. If the space parameter is a number, then
//          the indentation will be that many spaces.

//          Example:

//          text = JSON.stringify(["e", {pluribus: "unum"}]);
//          // text is '["e",{"pluribus":"unum"}]'

//          text = JSON.stringify(["e", {pluribus: "unum"}], null, "\t");
//          // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

//          text = JSON.stringify([new Date()], function (key, value) {
//              return this[key] instanceof Date
//                  ? "Date(" + this[key] + ")"
//                  : value;
//          });
//          // text is '["Date(---current time---)"]'

//      JSON.parse(text, reviver)
//          This method parses a JSON text to produce an object or array.
//          It can throw a SyntaxError exception.

//          The optional reviver parameter is a function that can filter and
//          transform the results. It receives each of the keys and values,
//          and its return value is used instead of the original value.
//          If it returns what it received, then the structure is not modified.
//          If it returns undefined then the member is deleted.

//          Example:

//          // Parse the text. Values that look like ISO date strings will
//          // be converted to Date objects.

//          myData = JSON.parse(text, function (key, value) {
//              var a;
//              if (typeof value === "string") {
//                  a =
//   /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
//                  if (a) {
//                      return new Date(Date.UTC(
//                         +a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]
//                      ));
//                  }
//                  return value;
//              }
//          });

//          myData = JSON.parse(
//              "[\"Date(09/09/2001)\"]",
//              function (key, value) {
//                  var d;
//                  if (
//                      typeof value === "string"
//                      && value.slice(0, 5) === "Date("
//                      && value.slice(-1) === ")"
//                  ) {
//                      d = new Date(value.slice(5, -1));
//                      if (d) {
//                          return d;
//                      }
//                  }
//                  return value;
//              }
//          );

//  This is a reference implementation. You are free to copy, modify, or
//  redistribute.

/*jslint
    eval, for, this
*/

/*property
    JSON, apply, call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== "object") {
  JSON = {};
}

(function () {
  "use strict";

  var rx_one = /^[\],:{}\s]*$/;
  var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
  var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
  var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
  var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
  var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

  function f(n) {
      // Format integers to have at least two digits.
      return (n < 10)
          ? "0" + n
          : n;
  }

  function this_value() {
      return this.valueOf();
  }

  if (typeof Date.prototype.toJSON !== "function") {

      Date.prototype.toJSON = function () {

          return isFinite(this.valueOf())
              ? (
                  this.getUTCFullYear()
                  + "-"
                  + f(this.getUTCMonth() + 1)
                  + "-"
                  + f(this.getUTCDate())
                  + "T"
                  + f(this.getUTCHours())
                  + ":"
                  + f(this.getUTCMinutes())
                  + ":"
                  + f(this.getUTCSeconds())
                  + "Z"
              )
              : null;
      };

      Boolean.prototype.toJSON = this_value;
      Number.prototype.toJSON = this_value;
      String.prototype.toJSON = this_value;
  }

  var gap;
  var indent;
  var meta;
  var rep;


  function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

      rx_escapable.lastIndex = 0;
      return rx_escapable.test(string)
          ? "\"" + string.replace(rx_escapable, function (a) {
              var c = meta[a];
              return typeof c === "string"
                  ? c
                  : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
          }) + "\""
          : "\"" + string + "\"";
  }


  function str(key, holder) {

// Produce a string from holder[key].

      var i;          // The loop counter.
      var k;          // The member key.
      var v;          // The member value.
      var length;
      var mind = gap;
      var partial;
      var value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

      if (
          value
          && typeof value === "object"
          && typeof value.toJSON === "function"
      ) {
          value = value.toJSON(key);
      }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

      if (typeof rep === "function") {
          value = rep.call(holder, key, value);
      }

// What happens next depends on the value's type.

      switch (typeof value) {
      case "string":
          return quote(value);

      case "number":

// JSON numbers must be finite. Encode non-finite numbers as null.

          return (isFinite(value))
              ? String(value)
              : "null";

      case "boolean":
      case "null":

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce "null". The case is included here in
// the remote chance that this gets fixed someday.

          return String(value);

// If the type is "object", we might be dealing with an object or an array or
// null.

      case "object":

// Due to a specification blunder in ECMAScript, typeof null is "object",
// so watch out for that case.

          if (!value) {
              return "null";
          }

// Make an array to hold the partial results of stringifying this object value.

          gap += indent;
          partial = [];

// Is the value an array?

          if (Object.prototype.toString.apply(value) === "[object Array]") {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

              length = value.length;
              for (i = 0; i < length; i += 1) {
                  partial[i] = str(i, value) || "null";
              }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

              v = partial.length === 0
                  ? "[]"
                  : gap
                      ? (
                          "[\n"
                          + gap
                          + partial.join(",\n" + gap)
                          + "\n"
                          + mind
                          + "]"
                      )
                      : "[" + partial.join(",") + "]";
              gap = mind;
              return v;
          }

// If the replacer is an array, use it to select the members to be stringified.

          if (rep && typeof rep === "object") {
              length = rep.length;
              for (i = 0; i < length; i += 1) {
                  if (typeof rep[i] === "string") {
                      k = rep[i];
                      v = str(k, value);
                      if (v) {
                          partial.push(quote(k) + (
                              (gap)
                                  ? ": "
                                  : ":"
                          ) + v);
                      }
                  }
              }
          } else {

// Otherwise, iterate through all of the keys in the object.

              for (k in value) {
                  if (Object.prototype.hasOwnProperty.call(value, k)) {
                      v = str(k, value);
                      if (v) {
                          partial.push(quote(k) + (
                              (gap)
                                  ? ": "
                                  : ":"
                          ) + v);
                      }
                  }
              }
          }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

          v = partial.length === 0
              ? "{}"
              : gap
                  ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
                  : "{" + partial.join(",") + "}";
          gap = mind;
          return v;
      }
  }

// If the JSON object does not yet have a stringify method, give it one.

  if (typeof JSON.stringify !== "function") {
      meta = {    // table of character substitutions
          "\b": "\\b",
          "\t": "\\t",
          "\n": "\\n",
          "\f": "\\f",
          "\r": "\\r",
          "\"": "\\\"",
          "\\": "\\\\"
      };
      JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

          var i;
          gap = "";
          indent = "";

// If the space parameter is a number, make an indent string containing that
// many spaces.

          if (typeof space === "number") {
              for (i = 0; i < space; i += 1) {
                  indent += " ";
              }

// If the space parameter is a string, it will be used as the indent string.

          } else if (typeof space === "string") {
              indent = space;
          }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

          rep = replacer;
          if (replacer && typeof replacer !== "function" && (
              typeof replacer !== "object"
              || typeof replacer.length !== "number"
          )) {
              throw new Error("JSON.stringify");
          }

// Make a fake root object containing our value under the key of "".
// Return the result of stringifying the value.

          return str("", {"": value});
      };
  }


// If the JSON object does not yet have a parse method, give it one.

  if (typeof JSON.parse !== "function") {
      JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

          var j;

          function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

              var k;
              var v;
              var value = holder[key];
              if (value && typeof value === "object") {
                  for (k in value) {
                      if (Object.prototype.hasOwnProperty.call(value, k)) {
                          v = walk(value, k);
                          if (v !== undefined) {
                              value[k] = v;
                          } else {
                              delete value[k];
                          }
                      }
                  }
              }
              return reviver.call(holder, key, value);
          }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

          text = String(text);
          rx_dangerous.lastIndex = 0;
          if (rx_dangerous.test(text)) {
              text = text.replace(rx_dangerous, function (a) {
                  return (
                      "\\u"
                      + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                  );
              });
          }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with "()" and "new"
// because they can cause invocation, and "=" because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with "@" (a non-JSON character). Second, we
// replace all simple value tokens with "]" characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or "]" or
// "," or ":" or "{" or "}". If that is so, then the text is safe for eval.

          if (
              rx_one.test(
                  text
                      .replace(rx_two, "@")
                      .replace(rx_three, "]")
                      .replace(rx_four, "")
              )
          ) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The "{" operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

              j = eval("(" + text + ")");

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

              return (typeof reviver === "function")
                  ? walk({"": j}, "")
                  : j;
          }

// If the text is not JSON parseable, then a SyntaxError is thrown.

          throw new SyntaxError("JSON.parse");
      };
  }
}());
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////

function jsoner() {
    var filePath = "G:/Fonts/6353.ttf";
    var file = new File(filePath);
    file.open("r");
    file.encoding = 'BINARY';
    var fileContents = file.read.toSource();
    file.close();
    
 

    // Convert JavaScript object to a JSON string
    var jsonString = JSON.stringify(fileContents);
alert(jsonString)
    // Return the JSON string to CEP
    return jsonString;
}


function testing () {
  var filePath = 'G:/Fonts/6353.ttf'
  var file = new File(filePath);
    if (!file.exists) {
        return "File not found";
    }

    file.open("r");
    var fileContents = file.read();
    file.close();

    // Send file contents to CEP
    var message = {
        type: "fileContents",
        content: fileContents.toSource() // Serialize file contents
    };
    var jsonString = JSON.stringify(message);
    app.socket.write(jsonString);
}

//FOLDER PARSER

function getSome(x) {
  // Folder path to scan
  var folderPath = x;

  // Function to get all files from a folder
  function getAllFilesFromFolder(folder) {
      var files = folder.getFiles();
      var fileStructure = [];

      for (var i = 0; i < files.length; i++) {
          var file = files[i];
          if (file instanceof Folder) {
              // Recursively get files from subfolders
              var folderFiles = getAllFilesFromFolder(file);
              // Check if the folder has files
              if (folderFiles.length > 0) {
                  var folderObj = {};
                  // Use decodeURI to handle non-ASCII characters
                  folderObj[decodeURI(file.name)] = folderFiles;
                  fileStructure.push(folderObj);
              }
          } else if (file instanceof File) {
              // Check if the item is a file
              // Use decodeURI to handle non-ASCII characters
              fileStructure.push(decodeURI(file.name));
          }
      }

      return fileStructure;
  }

  // Main function to get all files
  function getAllFiles() {
      var rootFolder = new Folder(folderPath);
      var allFiles = getAllFilesFromFolder(rootFolder);
      return allFiles;
  }

  // Run the main function
  var fileStructure = getAllFiles();

  // Alert the file structure
  //alert(fileStructure.toSource());

  return fileStructure.toSource();
}





////ERROR HANDLING
function checkCompositionAndTimeline() {
  var activeComp = app.project.activeItem;
  if (activeComp === null || !(activeComp instanceof CompItem)) {
    alert("Please create a new composition and select the Timeline panel (!) window before import.");
    return false;
  }
  return true;
}
  
//////// WRITING FLAG CHECK
function canWriteFiles() {
	var appVersion, commandID, scriptName, tabName;

	appVersion = parseFloat(app.version);

	commandID = 2359;
	tabName = 'General';
	if (appVersion >= 16.1) {
		commandID = 3131;
		tabName = 'Scripting & Expressions';
	}

	if (isSecurityPrefSet()) return true;


	alert(message = 'AE.imgPaster requires access to write files.\n' +
		'Go to the "' +  '" Edit > Preferences >  preferences and make sure ' +
		'"Allow Scripts to Write Files and Access Network" is checked.');

	app.executeCommand(commandID);

	return isSecurityPrefSet();

	function isSecurityPrefSet() {
		return app.preferences.getPrefAsLong(
			'Main Pref Section',
			'Pref_SCRIPTING_FILE_NETWORK_SECURITY'
		) === 1;
	}
}

//////////

function HELLO (x,y){



  var path = 'E:/test.pdf';
  var file = new File(path);

  file.open("w", "BINARY");
  // Write the binary data to the file
  for (var i = 0; i < y.length; i++) {
    file.write(String.fromCharCode(y.charCodeAt(i) & 0xff));
  }
  // Close the file
  file.close();

}




function getPATH(x) {
 //alert(x)
 
    if (x === "'0'") {
        path = Folder.desktop.fsName;
     //   alert("Desktop Path: " + path);
    } else if (x === "'1'") {
        var proj = app.project;
        if (proj && proj.file) {
            var projectFullPath = proj.file.fsName;
           // alert(projectFullPath);
            var projectName = proj.file.name.replace(/%20/g, " ");
            var pathWithoutFileName = projectFullPath.replace(projectName, "");
            path = pathWithoutFileName;
           // alert("Project Path: " + path);
        } else {
            alert("Project not found or not saved.");
        }
    }

    return path;

}


function HELLO2 (x) {
    var newFilePath = x;
  canWriteFiles() ;
  newFilePath = newFilePath.replace(/'/g, '');

var pdfPath = newFilePath;
 

var pdfFootage = app.project.importFile(new ImportOptions(File(pdfPath)));
var comp = app.project.activeItem;
var pdfLayer = comp.layers.add(pdfFootage);
pdfLayer.outPoint = comp.duration;

var activeComp = app.project.activeItem;

if (activeComp !== null && activeComp instanceof CompItem) {
    var activeLayer = activeComp.selectedLayers[0];
  
    if (activeLayer !== null && activeLayer.source !== null && activeLayer.source instanceof FootageItem) {
      var selectedFootage = activeLayer.source;
      
      if (selectedFootage.mainSource instanceof FileSource) {
        var filePath = selectedFootage.mainSource.file.fsName;
        var cmdID = app.findMenuCommandId("Create Shapes from Vector Layer");
        //app.executeCommand(cmdID);
        app.executeCommand(3973);
        //alert(cmdID);
        var newShapesLayer = activeComp.selectedLayers[0];
        newShapesLayer.name = "New Shape";
        newShapesLayer.moveBefore(activeLayer);
        
   
      }
    }
  }

  $.sleep(300);
activeLayer.remove();

pdfFootage.remove();
var file = new File(pdfPath);
file.remove();
   
///////////////////
  }
/////////////LUSTRA IMPORT

  function HELLO3 (x) {
    //alert(x)
    var newFilePath = x;
  //canWriteFiles() ;
  newFilePath = newFilePath.replace(/'/g, '');

    var svgFile = File(newFilePath);

var doc = app.activeDocument;  

doc.groupItems.createFromFile(svgFile); 
  }

/////////////// PS IMPORT


function HELLO4(x) {
    
 // canWriteFiles() ;
var path = x;
 var  xfilePath  = path.replace(/'/g, '');



var filePath = new File(xfilePath);





function placeEmbeded(filePath) {

var actDesc = new ActionDescriptor();

actDesc.putPath(charIDToTypeID('null'), filePath);

actDesc.putEnumerated(charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), charIDToTypeID('Qcsa'));

executeAction(charIDToTypeID('Plc '), actDesc, DialogModes.NO);

}

placeEmbeded(filePath);

}
 
/////////////////////////////////////////////////////////////////////////

//FUNCTION TO GET PATH FOLDERS AND GENERATE JSON STUFF OF IT
//GET HOST
// IF HOST AE THEN CONVERT IF NOT THEN TAKE SVG AND CONVERT TO BINARY AND SEND

//FUNCTION TO CREATE 
//file data binary   //what is data?
//path value         //get basic

//PS CAN IMPORT SVG AND LUSTRA ALSO
// SO ONLY AE NEEDS THIS

//check if AE/PS/LUSTRA
//check if can write   /igorner
//check if timeline selected   /ignored

//path value convertion to desktop, documents, custom
//create file pdf //get basic
//write binary    

//detect ae/ps/illustra //how ps and lustra imporots
//import file from path




function ALRT(x,y){
  canWriteFiles();
  


///DEBUG

///
    //alert(x + ', ' + y);
    var PDFCB = y;
    //alert(PDFCB);
    var pdfPath = x;
///



//////////////ADDED
    var compositionAndTimelineChecked = checkCompositionAndTimeline();
    if (!compositionAndTimelineChecked)
      return;
///////////////////

    if (PDFCB == "'0'") {
        var pdfFootage = app.project.importFile(new ImportOptions(File(pdfPath)));
        var comp = app.project.activeItem;
        var pdfLayer = comp.layers.add(pdfFootage);
        pdfLayer.outPoint = comp.duration;
        
        var activeComp = app.project.activeItem;

        if (activeComp !== null && activeComp instanceof CompItem) {
            var activeLayer = activeComp.selectedLayers[0];
          
            if (activeLayer !== null && activeLayer.source !== null && activeLayer.source instanceof FootageItem) {
              var selectedFootage = activeLayer.source;
              
              if (selectedFootage.mainSource instanceof FileSource) {
                var filePath = selectedFootage.mainSource.file.fsName;
                var cmdID = app.findMenuCommandId("Create Shapes from Vector Layer");
                //app.executeCommand(cmdID);
                app.executeCommand(3973);
                //alert(cmdID);
                var newShapesLayer = activeComp.selectedLayers[0];
                newShapesLayer.name = "New Shape";
                newShapesLayer.moveBefore(activeLayer);
                
           
              }
            }
          }

          $.sleep(300);
        activeLayer.remove();

        pdfFootage.remove();
        var file = new File(x);
        file.remove();
        
      //alert("y is equal to '0'");
    } else {

//take path  of file
// rename it to random 
// delete old file
// import new one

var activeComp = app.project.activeItem;


        var oldFilePath = pdfPath; // Replace with the current file path
        var Random = Math.floor(Math.random() * 1000);
        var newFileName = "NewImport"+Random+".pdf"; // Replace with the desired new file name
        //alert(newFileName);
var oldFile = new File(oldFilePath);
 var newFilePath = oldFile.path + "/" + newFileName;  
        if (File.fs === "Windows"){                     
        oldFile.rename(newFilePath);
} else if (File.fs === "Macintosh") {
        oldFile.rename(newFileName);


};
$.sleep(1000);
        //importing
        var pdfFootage = app.project.importFile(new ImportOptions(File(newFilePath)));
        var comp = app.project.activeItem;
        var pdfLayer = comp.layers.add(pdfFootage);
        pdfLayer.outPoint = comp.duration;
        
        
    


      //alert("y is not equal to '1'");
    }
  




// if y = 1 new file rename and delete


// else new file delete and imported stuff


    };
    
//////////

///////////////// FUNCTIONALITY TEST
///
