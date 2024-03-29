const { jsPDF } = window.jspdf
const DOMPurify = window.DOMPurify

var TEST = 'hey';
var XXX;
var YYY;
var PDFCB;
var ZZZ;

//////////////////

/////////////////////


const defaultSample = ``

const editor = CodeMirror(document.getElementById('editor'), {
  lineNumbers: true,
  mode: 'xml'
})

const doc = editor.getDoc()

window.addEventListener('load', () => {
  const url = new URL(window.location)
  const editorText = url.searchParams.get('svg')
  if (editorText) {
    doc.setValue(decodeURIComponent(defaultSample))
  } else {
    doc.setValue(defaultSample)
  }
})

editor.on(
  'change',
  debounce(() => {
    const svgText = DOMPurify.sanitize(doc.getValue(), { ADD_TAGS: ['use'] })
    //updateUrl(svgText)
    //updateIssueLinks()
    updateSvg(svgText)
    updatePdf()
  })
)

function debounce(f) {
  let timeout
  return () => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      f()
      timeout = undefined
    }, 100)
  }
}





function updateSvg(svgText) {
  document.getElementById('svg-container').innerHTML = svgText
}

async function updatePdf() {

  //var svgElement = $('#svg-render').find('svg')[0];
  //var svgXml = new XMLSerializer().serializeToString(svgElement);
  //alert(svgXml);
  //svgElement = svgXml;  
 // svgElement.getBoundingClientRect() // force layout calculation


 var parentDiv = document.getElementById('svg-render');
 var svgElement = parentDiv.querySelector('svg');
 var bbox = svgElement.getBBox();
 var viewBoxX = bbox.x;
 var viewBoxY = bbox.y;
 var viewBoxWidth = bbox.width;
 var viewBoxHeight = bbox.height;
svgElement.setAttribute('viewBox', viewBoxX + ' ' + viewBoxY + ' ' + viewBoxWidth + ' ' + viewBoxHeight);

var width = viewBoxWidth;
var height = viewBoxHeight;


  const pdf = new jsPDF(width > height ? 'l' : 'p', 'px', [width, height])

  await pdf.svg(svgElement, {width, height })



var pdfDataUri = pdf.output("datauristring");
const myArray = pdfDataUri.split("base64,");
let data = myArray[1];

//var SSS = atob(data);
//var jsonString = JSON.stringify(SSS);


var randomNumber = Math.floor(100 + Math.random() * 900);
var filename = pathX + "image" + randomNumber + ".pdf";
pathFile = filename;




window.cep.fs.writeFile(filename, data, window.cep.encoding.Base64)

setTimeout(function() {
 $('#test10').click();
}, 300);


$('#input-size').trigger('keyup');
setTimeout(function() {
  $('#lineCtrlY').trigger('input');
  $('#lineCtrlX').trigger('input');
}, 100);
/*
var filename;
if(document.getElementById('cpcheck').checked) {
   filename = CustPath + "/test.pdf";
  //
addToLog(filename);
  //
} else {
   filename = myArray2[1] + "/test.pdf";
   //
addToLog(filename);
   //
}
*/
//XXX = 'filename';
//YYY = jsonString;

//$('#test8').click();
//alert(data);
//ZZZ = myArray2[1];
//console.log(YYY);



//var fileNameLOG = window.__adobe_cep__.getSystemPath("myDocuments") + "/log.txt";
//const myArray2LOG = fileNameLOG.split("file:///");
//window.cep.fs.writeFile(myArray2LOG[1], log);

//$('#test8').click();
//WRITE(CLICK);
};




function WRITE (callback) {
// window.cep.fs.writeFile(XXX, YYY, window.cep.encoding.Base64);
  callback();
  //alert('paths is '+XXX);
  //alert('data is '+YYY);
  }; 



function CLICK () {
  $('#test8').click();
   setTimeout(function() {
    location.reload();
  }, 3000);
};

