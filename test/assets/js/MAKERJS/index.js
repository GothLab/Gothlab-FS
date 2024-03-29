///<reference path="node_modules/makerjs/index.d.ts" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


var IDS = {};

////////////////


/////GOOGLE FONTS API KEY
var GAPI = localStorage.getItem('googleApi');




/////////////
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var makerjs = require('makerjs');
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.renderCurrent = function () {
            _this.errorDisplay.innerHTML = '';
            var size = _this.sizeInput.valueAsNumber;
            if (!size)
                size = parseFloat(_this.sizeInput.value);
            if (!size)
                size = 60;
            _this.render(_this.selectFamily.selectedIndex, _this.selectVariant.selectedIndex, _this.textInput.value, size, _this.unionCheckbox.checked, _this.filledCheckbox.checked, _this.kerningCheckbox.checked, _this.separateCheckbox.checked, parseFloat(_this.bezierAccuracy.value) || undefined, _this.selectUnits.value, _this.fillInput.value, _this.strokeInput.value, _this.strokeWidthInput.value, _this.strokeNonScalingCheckbox.checked, _this.fillRuleInput.value);
        };
        this.loadVariants = function () {
            _this.selectVariant.options.length = 0;
            var f = _this.fontList.items[_this.selectFamily.selectedIndex];
            var v = f.variants.forEach(function (v) { return _this.addOption(_this.selectVariant, v); });
            _this.renderCurrent();
        };


        this.downloadSvg = function () {
            var svgElement = document.getElementById('svg-render').firstElementChild;
  var svgXml = new XMLSerializer().serializeToString(svgElement);

  // Set SVG text to textarea
  $('#output2').val(svgXml);

  // Introduce a wait of 1000 milliseconds (1 second)
 

      // Continue with the remaining steps after the delay

      // Convert SVG text to base64
      var svgBase64 = window.btoa(svgXml);

      // Create data URI
      var dataUri = 'data:image/svg+xml;base64,' + svgBase64;

      // Update download link attributes
      _this.downloadButton.href = dataUri;
      _this.downloadButton.download = _this.textInput.value;

      // Trigger the click event to initiate the download
    

      // Resolve the promise to signal the completion of the operation
      
   

        };

        
        this.downloadDxf = function () {
            var dxfFile = window.btoa(_this.renderDiv.getAttribute('data-dxf'));
            _this.dxfButton.href = 'data:application/dxf;base64,' + dxfFile;
            _this.dxfButton.download = _this.textInput.value + '.dxf';
        };
        this.copyToClipboard = function () {
            _this.outputTextarea.select();
            document.execCommand('copy');
            _this.copyToClipboardBtn.innerText = 'copied';
            setTimeout(function () {
                _this.copyToClipboardBtn.innerText = 'copy to clipboard';
            }, 2000);
        };
        this.updateUrl = function () {
            var urlSearchParams = new URLSearchParams(window.location.search);
            urlSearchParams.set('font-select', _this.selectFamily.value);
            urlSearchParams.set('font-variant', _this.selectVariant.value);
            urlSearchParams.set('input-union', String(_this.unionCheckbox.checked));
            urlSearchParams.set('input-filled', String(_this.filledCheckbox.checked));
            urlSearchParams.set('input-kerning', String(_this.kerningCheckbox.checked));
            urlSearchParams.set('input-separate', String(_this.separateCheckbox.checked));
            urlSearchParams.set('input-text', _this.textInput.value);
            urlSearchParams.set('input-bezier-accuracy', _this.bezierAccuracy.value);
            urlSearchParams.set('dxf-units', _this.selectUnits.value);
            urlSearchParams.set('input-size', _this.sizeInput.value);
            urlSearchParams.set('input-fill', _this.fillInput.value);
            urlSearchParams.set('input-stroke', _this.strokeInput.value);
            urlSearchParams.set('input-strokeWidth', _this.strokeWidthInput.value);
            urlSearchParams.set('input-fill-rule', _this.fillRuleInput.value);
            var url = window.location.protocol
                + "//" + window.location.host
                + window.location.pathname
                + "?"
                + urlSearchParams.toString();
            window.history.replaceState({ path: url }, "", url);
            _this.copyString(window.location.href);
            _this.createLinkButton.innerText = 'copied';
            setTimeout(function () {
                _this.createLinkButton.innerText = 'create link';
            }, 2000);
        };
        this.copyString = function (string) {
            _this.dummy.value = string;
            _this.dummy.type = 'text';
            _this.dummy.select();
            document.execCommand('copy');
            _this.dummy.type = 'hidden';
        };

        ////////////////////////
    


        /////
        this.readUploadedFile = function (event) {
            var element = event.currentTarget;
            if (element.files.length === 0) {
                this.customFont = undefined;
                this.renderCurrent();
            } else {
                var files = element.files[0];
                var buffer = files.arrayBuffer();
                var font = opentype.parse(buffer);
                this.customFont = font;
                this.renderCurrent();
            }
        };
        //////////////////
        this.removeUploadedFont = function () {
            _this.fileUpload.value = null;
            _this.customFont = undefined;
            _this.renderCurrent();
        };
////////////////////////


///////////////////////////
    }
    App.prototype.init = function () {
        var _this = this;
  
        this.errorDisplay = this.$('#error-display');
        this.fileUpload = this.$('#font-upload');
        this.fileUploadRemove = this.$('#font-upload-remove');
        this.selectFamily = this.$('#font-select');
        this.selectVariant = this.$('#font-variant');
        this.unionCheckbox = this.$('#input-union');
        this.filledCheckbox = this.$('#input-filled');
        this.kerningCheckbox = this.$('#input-kerning');
        this.separateCheckbox = this.$('#input-separate');
        
        this.textInput = this.$('#text-area');

        this.bezierAccuracy = this.$('#input-bezier-accuracy');
        this.selectUnits = this.$('#dxf-units');
        this.sizeInput = this.$('#input-size');
        this.renderDiv = this.$('#svg-render');
        this.outputTextarea = this.$('#output-svg');
        this.downloadButton = this.$("#download-btn");
        this.dxfButton = this.$("#dxf-btn");
        this.createLinkButton = this.$("#create-link");
        this.copyToClipboardBtn = this.$("#copy-to-clipboard-btn");
        this.dummy = this.$('#dummy');
        this.fillInput = this.$('#input-fill');
        this.strokeInput = this.$('#input-stroke');
        this.strokeWidthInput = this.$('#input-stroke-width');
        this.strokeNonScalingCheckbox = this.$('#input-stroke-non-scaling');
        this.fillRuleInput = this.$("#input-fill-rule");
        // Init units select.
        Object.values(makerjs.unitType).forEach(function (unit) { return _this.addOption(_this.selectUnits, unit); });
    };
    App.prototype.readQueryParams = function () {
        var urlSearchParams = new URLSearchParams(window.location.search);
        var selectFamily = urlSearchParams.get('font-select');
        var selectVariant = urlSearchParams.get('font-variant');
        var unionCheckbox = urlSearchParams.get('input-union');
        var filledCheckbox = urlSearchParams.get('input-filled');
        var kerningCheckbox = urlSearchParams.get('input-kerning');
        var separateCheckbox = urlSearchParams.get('input-separate');
        var textInput = urlSearchParams.get('input-text');
        var bezierAccuracy = urlSearchParams.get('input-bezier-accuracy');
        var selectUnits = urlSearchParams.get('dxf-units');
        var sizeInput = urlSearchParams.get('input-size');
        var fillInput = urlSearchParams.get('input-fill');
        var strokeInput = urlSearchParams.get('input-stroke');
        var strokeWidthInput = urlSearchParams.get('input-stroke-width');
        var strokeNonScalingCheckbox = urlSearchParams.get('input-stroke-non-scaling');
        var fillRuleInput = urlSearchParams.get('input-fill-rule');
        if (selectFamily !== "" && selectFamily !== null)
            this.selectFamily.value = selectFamily;
        if (selectVariant !== "" && selectVariant !== null)
            this.selectVariant.value = selectVariant;
        if (selectUnits !== "" && selectUnits !== null)
            this.selectUnits.value = selectUnits;
        if (unionCheckbox !== "" && unionCheckbox !== null)
            this.unionCheckbox.checked = unionCheckbox === "true" ? true : false;
        if (filledCheckbox !== "" && filledCheckbox !== null)
            this.filledCheckbox.checked = filledCheckbox === "true" ? true : false;
        if (kerningCheckbox !== "" && kerningCheckbox !== null)
            this.kerningCheckbox.checked = kerningCheckbox === "true" ? true : false;
        if (separateCheckbox !== "" && separateCheckbox !== null)
            this.separateCheckbox.checked = separateCheckbox === "true" ? true : false;
        if (textInput !== "" && textInput !== null)
            this.textInput.value = textInput;
        if (bezierAccuracy !== "" && bezierAccuracy !== null)
            this.bezierAccuracy.value = bezierAccuracy;
        if (sizeInput !== "" && sizeInput !== null)
            this.sizeInput.value = sizeInput;
        if (fillInput !== "" && fillInput !== null)
            this.fillInput.value = fillInput;
        if (strokeInput !== "" && strokeInput !== null)
            this.strokeInput.value = strokeInput;
        if (strokeWidthInput !== "" && strokeWidthInput !== null)
            this.strokeWidthInput.value = strokeWidthInput;
        if (strokeNonScalingCheckbox !== "" && strokeNonScalingCheckbox !== null)
            this.strokeNonScalingCheckbox.checked = strokeNonScalingCheckbox === "true" ? true : false;
        if (fillRuleInput !== "" && fillRuleInput !== null)
            this.fillRuleInput.value = fillRuleInput;
    };
    App.prototype.handleEvents = function () {
        this.fileUpload.onchange = this.readUploadedFile;
        this.fileUploadRemove.onclick = this.removeUploadedFont;
        this.selectFamily.onchange = this.loadVariants;
        this.selectVariant.onchange =
            this.textInput.onchange =
                this.textInput.onkeyup =
                    this.sizeInput.onkeyup =
                        this.unionCheckbox.onchange =
                            this.filledCheckbox.onchange =
                                this.kerningCheckbox.onchange =
                                    this.separateCheckbox.onchange =
                                        this.bezierAccuracy.onchange =
                                            this.bezierAccuracy.onkeyup =
                                                this.selectUnits.onchange =
                                                    this.fillInput.onchange =
                                                        this.fillInput.onkeyup =
                                                            this.strokeInput.onchange =
                                                                this.strokeInput.onkeyup =
                                                                    this.strokeWidthInput.onchange =
                                                                        this.strokeWidthInput.onkeyup =
                                                                            this.strokeNonScalingCheckbox.onchange =
                                                                                this.fillRuleInput.onchange =
                                                                                    this.renderCurrent;
        // Is triggered on the document whenever a new color is picked
        document.addEventListener("coloris:pick", debounce(this.renderCurrent));
        this.copyToClipboardBtn.onclick = this.copyToClipboard;
        this.downloadButton.onclick = this.downloadSvg;
        this.dxfButton.onclick = this.downloadDxf;
        this.createLinkButton.onclick = this.updateUrl;
        generateButtonsForSelect();
    };
    App.prototype.$ = function (selector) {
        return document.querySelector(selector);
    };
    App.prototype.addOption = function (select, optionText) {
        var option = document.createElement('option');
        option.text = optionText;
        option.value = optionText;
        select.options.add(option);
    };
    App.prototype.getGoogleFonts = function (apiKey) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'https://www.googleapis.com/webfonts/v1/webfonts?key=' + apiKey, true);
        xhr.onloadend = function () {
            _this.fontList = JSON.parse(xhr.responseText);
            _this.fontList.items.forEach(function (font) { return _this.addOption(_this.selectFamily, font.family); });
            _this.loadVariants();
            _this.handleEvents();
            _this.readQueryParams();
            _this.renderCurrent();
        };
        xhr.send();
    };
    //////////////////////////////////////
/////////////////////////////////
////////////////////////////////







/*
App.prototype.callMakerjs = function(font, text, size, union, filled, kerning, separate, bezierAccuracy,
    units, fill, stroke, strokeWidth, strokeNonScaling, fillRule) {
    // Generate the text using a font
    var textModel = new makerjs.models.Text(font, text, size, union, false, bezierAccuracy, {
        kerning: kerning
    });
    if (separate) {
        for (var i in textModel.models) {
            textModel.models[i].layer = i;
        }
    }
    var lines = [];
    var currentLine = [];
    var lineBreakIds = [];
    for (var i = 0; i < text.length; i++) {
        if (text[i] === '\n') {
            lines.push({
                varName: 'line' + (lines.length + 1),
                indices: currentLine
            });
            lineBreakIds.push(i);
            currentLine = [];
        } else {
            currentLine.push(i);
        }
    }
    if (currentLine.length > 0) {
        lines.push({
            varName: 'line' + (lines.length + 1),
            indices: currentLine
        });
    }
    for (var j = 0; j < lines.length; j++) {
        var lineInfo = lines[j];
        this[lineInfo.varName] = lineInfo.indices;
        console.log('Stored ' + lineInfo.varName + ': [' + lineInfo.indices.join(', ') + ']');
    }
    /////////////////////////
    console.log(lines)
    /////////////////////////////////
    var svg = makerjs.exporter.toSVG(textModel, {
        fill: filled ? fill : undefined,
        fillRule: fillRule ? fillRule : undefined,
    });
    var dxf = makerjs.exporter.toDXF(textModel, {
        units: units,
        usePOLYLINE: true
    });
    this.renderDiv.innerHTML = svg;
    this.renderDiv.setAttribute('data-dxf', dxf);
    this.outputTextarea.value = svg;
    // console.log(svg);
    // console.log(lineBreakIds)
    for (var i = 0; i < lineBreakIds.length; i++) {
        $('#svg-render #' + lineBreakIds[i]).remove();
    }
    //$('#svg-render').find('path:lt(2)').wrapAll('<g id=''></g>'); 
    for (var j = 0; j < lines.length; j++) {
        var lineInfo = lines[j];
        // Access the line indices array using the generated variable name
        var lineIndices = this[lineInfo.varName];
        // Get the first and last numbers in the line
        var firstNumber = lineIndices[0];
        var lastNumber = lineIndices[lineIndices.length - 1];
        IDS[lineInfo.varName] = $('#svg-render').find('path').filter(function() {
            var pathId = parseInt(this.id, 10);
            return pathId >= firstNumber && pathId <= lastNumber;
        });
        // Create buttons for each line in IDS
        function createLineButtons() {
            var $linesG = $('#linesG');
            // Remove existing buttons
            $linesG.empty();
            // Create buttons for each line in IDS
            for (var lineName in IDS) {
                var $button = $('<button>', {
                    text: lineName,
                    id: lineName,
                    class: 'line-button',
                    click: function() {
                        // Make the clicked line active
                        $('.line-button').removeClass('active');
                        $(this).addClass('active');
                        // Update transformations based on the line name
                        // updateTransformations($(this).text());
                    }
                });
                $linesG.append($button);
            }
        }
        // Initial creation of buttons
        createLineButtons();
        $('#linesG').children().last().addClass('active');
        //attatch changes
        $('#lineCtrlX, #lineCtrlY').on('input', function() {
            // Get the active line
            var activeLine = $('#linesG .active').text();
            // Check if an active line exists
            if (activeLine) {
                // Update transformations based on the active line
                // updateTransformations(activeLine);
                var activeID = IDS[activeLine];
                var translateX = $('#lineCtrlX').val();
                var translateY = $('#lineCtrlY').val();
                // Construct the transform string
                var transformValue = 'translate(' + translateX + 'px, ' + translateY + 'px)';
                $(activeID).css('transform', transformValue)
            }
        });
        // Function to update transformations based on range input values
        //ranges resets
        /////////////////////////
        console.log('Line ' + lineInfo.varName + ': First Number = ' + firstNumber +
            ', Last Number = ' + lastNumber);
    }
};
    */

App.prototype.callMakerjs = function(font, text, size, union, filled, kerning, separate, bezierAccuracy,
    units, fill, stroke, strokeWidth, strokeNonScaling, fillRule) {
    // Generate the text using a font
    var textModel = new makerjs.models.Text(font, text, size, union, false, bezierAccuracy, {
        kerning: kerning
    });
    if (separate) {
        for (var i in textModel.models) {
            textModel.models[i].layer = i;
        }
    }
    var lines = [];
    var currentLine = [];
    var lineBreakIds = [];
    for (var i = 0; i < text.length; i++) {
        if (text[i] === '\n') {
            lines.push({
                varName: 'line' + (lines.length + 1),
                indices: currentLine
            });
            lineBreakIds.push(i);
            currentLine = [];
        } else {
            currentLine.push(i);
        }
    }
    if (currentLine.length > 0) {
        lines.push({
            varName: 'line' + (lines.length + 1),
            indices: currentLine
        });
    }
    for (var j = 0; j < lines.length; j++) {
        var lineInfo = lines[j];
        this[lineInfo.varName] = lineInfo.indices;
        console.log('Stored ' + lineInfo.varName + ': [' + lineInfo.indices.join(', ') + ']');
    }
    /////////////////////////
    console.log(lines)
    /////////////////////////////////
    var svg = makerjs.exporter.toSVG(textModel, {
        fill: filled ? fill : undefined,
        fillRule: fillRule ? fillRule : undefined,
    });
    var dxf = makerjs.exporter.toDXF(textModel, {
        units: units,
        usePOLYLINE: true
    });
    this.renderDiv.innerHTML = svg;
    this.renderDiv.setAttribute('data-dxf', dxf);
    this.outputTextarea.value = svg;
    // console.log(svg);
    // console.log(lineBreakIds)
    for (var i = 0; i < lineBreakIds.length; i++) {
        $('#svg-render #' + lineBreakIds[i]).remove();
    }
    //$('#svg-render').find('path:lt(2)').wrapAll('<g id=''></g>'); 
    for (var j = 0; j < lines.length; j++) {
        var lineInfo = lines[j];
        // Access the line indices array using the generated variable name
        var lineIndices = this[lineInfo.varName];
        // Get the first and last numbers in the line
        var firstNumber = lineIndices[0];
        var lastNumber = lineIndices[lineIndices.length - 1];
        IDS[lineInfo.varName] = $('#svg-render').find('path').filter(function() {
            var pathId = parseInt(this.id, 10);
            return pathId >= firstNumber && pathId <= lastNumber;
        });
        // Load x and y values from localStorage
        var translateX = localStorage.getItem(lineInfo.varName + '_x') || '0';
        var translateY = localStorage.getItem(lineInfo.varName + '_y') || '0';
        // Construct the transform string
        var transformValue = 'translate(' + translateX + 'px, ' + translateY + 'px)';
        // Apply CSS transform to the SVG lines
        IDS[lineInfo.varName].css('transform', transformValue);
        // Create buttons for each line in IDS

        function attachValuesFromLocalStorage(activeLine) {
            // Get the x and y values from localStorage
            var translateX = localStorage.getItem(activeLine + '_x');
            var translateY = localStorage.getItem(activeLine + '_y');
            
            // Set the values to the range inputs
            $('#lineCtrlX').val(translateX);
            $('#lineCtrlY').val(translateY);
        }




        function createLineButtons() {
            var $linesG = $('#linesG');
            // Remove existing buttons
            $linesG.empty();
            // Create buttons for each line in IDS
            for (var lineName in IDS) {
                var $button = $('<button>', {
                    text: lineName,
                    id: lineName,
                    class: 'line-button',
                    click: function() {
                        // Make the clicked line active
                        $('.line-button').removeClass('active');
                        $(this).addClass('active');
                        // Update transformations based on the line name
                        // updateTransformations($(this).text());
                        var activeLine = $(this).text();

                        // Attach values from localStorage to ranges
                        attachValuesFromLocalStorage(activeLine);



                    }
                });
                $linesG.append($button);
            }
        }
        // Initial creation of buttons
        createLineButtons();
        $('#linesG').children().last().addClass('active');
        // Attach changes
        $('#lineCtrlX, #lineCtrlY').on('input', function() {
            // Get the active line
            var activeLine = $('#linesG .active').text();
            // Check if an active line exists
            if (activeLine) {
                // Update transformations based on the active line
                // updateTransformations(activeLine);
                var activeID = IDS[activeLine];
                var translateX = $('#lineCtrlX').val();
                var translateY = $('#lineCtrlY').val();
                // Construct the transform string
                var transformValue = 'translate(' + translateX + 'px, ' + translateY + 'px)';
                // Update the CSS transform for the active line
                $(activeID).css('transform', transformValue);
        
                // Update localStorage with the new x and y values
                localStorage.setItem(activeLine + '_x', translateX);
                localStorage.setItem(activeLine + '_y', translateY);
            }
        });
        // Function to update transformations based on range input values
        //ranges resets
        /////////////////////////
        console.log('Line ' + lineInfo.varName + ': First Number = ' + firstNumber +
            ', Last Number = ' + lastNumber);
    }
};













    
    ////////////////
//////////////////////
   ////////////////
   /*
   App.prototype.loadFontFromURLAndRender = function (fontURL) {
    fetch(fontURL)
        .then(response => response.arrayBuffer())
        .then(buffer => {
            const font = opentype.parse(buffer);
            this.customFont = font;
            this.renderCurrent();
        })
        .catch(error => {
            this.errorDisplay.innerHTML = `Error loading font from URL: ${error}`;
        });
};
*/

App.prototype.loadFontFromURLAndRender = function (filePath) {


var self = this; // Store a reference to the current context

// Read the file
opentype.load(filePath, function (err, font) {
    if (err) {
        alert('Can not load font');
        return;
    }

    // Assign the loaded font to the customFont property
    self.customFont = font;

    // Render the current content after the font is loaded
    self.renderCurrent();
});
    
};
////////////////////////////////////
///////////////////
























//////////////////////
////////////////////
    App.prototype.render = function (fontIndex, variantIndex, text, size, union, filled, kerning, separate, bezierAccuracy, units, fill, stroke, strokeWidth, strokeNonScaling, fillRule) {
        var _this = this;
        var f = this.fontList.items[fontIndex];
        var v = f.variants[variantIndex];
        var url = f.files[v].replace('http:', 'https:');
        if (this.customFont !== undefined) {
            this.callMakerjs(this.customFont, text, size, union, filled, kerning, separate, bezierAccuracy, units, fill, stroke, strokeWidth, strokeNonScaling, fillRule);
        }
        else {
            opentype.load(url, function (err, font) {
                if (err) {
                    _this.errorDisplay.innerHTML = err.toString();
                }
                else {
                    _this.callMakerjs(font, text, size, union, filled, kerning, separate, bezierAccuracy, units, fill, stroke, strokeWidth, strokeNonScaling, fillRule);
                }
            });
        }
    };




    
    return App;
}());
var app = new App();
window.onload = function () {
    app.init();
    app.getGoogleFonts(GAPI);
};
/**
 * Creates and returns a new debounced version of the passed function that will
 * postpone its execution until after wait milliseconds have elapsed since the last time it was invoked.
 *
 * @param callback
 * @param wait
 * @returns
 */
function debounce(callback, wait) {
    if (wait === void 0) { wait = 200; }
    var timeoutId = null;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(function () {
            callback.apply(null, args);
        }, wait);
    };
}





$("#inverter").on("click", function() {
    // Toggle between "#000000" (black) and "#ffffff" (white) value
    $("#input-fill").val(function(_, currentVal) {
        return currentVal === "#ffffff" ? "#000000" : "#ffffff";
    }).trigger("change");
});


$('#download').on('click',function(){

    var svgElement = $('#svg-render').find('svg')[0];

    // Serialize the SVG to XML
    var svgXml = new XMLSerializer().serializeToString(svgElement);

    // Convert SVG text to base64
    var svgBase64 = window.btoa(svgXml);

    // Create data URI
    var dataUri = 'data:image/svg+xml;base64,' + svgBase64;

    const myArray = dataUri.split("base64,");
    let data = myArray[1];

    /// GET PATH FROM SETTINGS LOCAL STORAGE IF DOCUMENTS, FILE ETC.




var documentsPath = window.__adobe_cep__.getSystemPath("myDocuments");
const myArray2 = documentsPath.split("file:///");

var filename = myArray2[1] + "/testDDDD.svg";

var XXX = filename;
var YYY = data;

setTimeout(function() {
    window.cep.fs.writeFile(XXX, YYY, window.cep.encoding.Base64);
  }, 7000);


})

















function readFontFromFile() {
    const fontFilePath = 'G:/Fonts/6353.ttf';
    
    window.__adobe_cep__.fs.readFile(fontFilePath, function(err, data) {
        if (!err) {
            const fontBuffer = new Uint8Array(data);
            // Now you can process the font buffer as needed
            alert('Font file read successfully:');
        } else {
            alert('Error reading font file:', err);
        }
    });
    
}

// Call the function to read the font file





