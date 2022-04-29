var context;

// Check for the canvas tag onload.
   if(window.addEventListener) {
 window.addEventListener('load', function () {
 var canvas, canvaso, contexto;
 // Default tool. (chalk, line, rectangle)
   var tool;
   var tool_default = 'chalk';

function init () {
canvaso = document.getElementById('drawingCanvas');
   if (!canvaso) {
   alert('Error! The canvas element was not found!');
   return;
   }
 if (!canvaso.getContext) {
   alert('Error! No canvas.getContext!');
   return;
   }
// Create 2d canvas.
   contexto = canvaso.getContext('2d');
   if (!contexto) {
   alert('Error! Failed to getContext!');
   return;
   }
 // Build the temporary canvas.
   var container = canvaso.parentNode;
   canvas = document.createElement('canvas');
   if (!canvas) {
   alert('Error! Cannot create a new canvas element!');
   return;
   }
 canvas.id     = 'tempCanvas';
   canvas.width  = canvaso.width;
   canvas.height = canvaso.height;
   container.appendChild(canvas);
context = canvas.getContext('2d');
   context.strokeStyle = "#FFFFFF";// Default line color.
   context.lineWidth = 1.0;// Default stroke weight.

   // Fill transparent canvas with dark grey (So we can use the color to erase).
   context.fillStyle = "#424242";
   context.fillRect(0,0,897,532);//Top, Left, Width, Height of canvas.

   // Create a select field with our tools.
 var tool_select = document.getElementById('selector');
 if (!tool_select) {
 alert('Error! Failed to get the select element!');
 return;
 }
 tool_select.addEventListener('change', ev_tool_change, false);

 // Activate the default tool (chalk).
 if (tools[tool_default]) {
 tool = new tools[tool_default]();
 tool_select.value = tool_default;
 }
 // Event Listeners.
   canvas.addEventListener('mousedown', ev_canvas, false);
   canvas.addEventListener('mousemove', ev_canvas, false);
   canvas.addEventListener('mouseup',   ev_canvas, false);
   }
// Get the mouse position.
   function ev_canvas (ev) {
   if (ev.layerX || ev.layerX == 0) { // Firefox
   ev._x = ev.layerX;
   ev._y = ev.layerY;
   } else if (ev.offsetX || ev.offsetX == 0) { // Opera
   ev._x = ev.offsetX;
   ev._y = ev.offsetY;
   }
// Get the tool's event handler.
   var func = tool[ev.type];
   if (func) {
   func(ev);
   }
   }
   function ev_tool_change (ev) {
   if (tools[this.value]) {
   tool = new tools[this.value]();
   }
   }
// Create the temporary canvas on top of the canvas, which is cleared each time the user draws.
   function img_update () {
   contexto.drawImage(canvas, 0, 0);
   context.clearRect(0, 0, canvas.width, canvas.height);
   }
   var tools = {};
 // Chalk tool.
   tools.chalk = function () {
   var tool = this;
   this.started = false;
 // Begin drawing with the chalk tool.
   this.mousedown = function (ev) {
   context.beginPath();
   context.moveTo(ev._x, ev._y);
   tool.started = true;
   };
   this.mousemove = function (ev) {
   if (tool.started) {
   context.lineTo(ev._x, ev._y);
   context.stroke();
   }
   };
   this.mouseup = function (ev) {
   if (tool.started) {
   tool.mousemove(ev);
   tool.started = false;
   img_update();
   }
   };
   };
// The rectangle tool.
 tools.rect = function () {
 var tool = this;
 this.started = false;
 this.mousedown = function (ev) {
 tool.started = true;
 tool.x0 = ev._x;
 tool.y0 = ev._y;
 };
 this.mousemove = function (ev) {
 if (!tool.started) {
 return;
 }
 // This creates a rectangle on the canvas.
 var x = Math.min(ev._x,  tool.x0),
 y = Math.min(ev._y,  tool.y0),
 w = Math.abs(ev._x - tool.x0),
 h = Math.abs(ev._y - tool.y0);
 context.clearRect(0, 0, canvas.width, canvas.height);// Clears the rectangle onload.

if (!w || !h) {
   return;
   }
   context.strokeRect(x, y, w, h);
   };
   // Now when you select the rectangle tool, you can draw rectangles.
   this.mouseup = function (ev) {
   if (tool.started) {
   tool.mousemove(ev);
   tool.started = false;
   img_update();
}
};
};
// The line tool.
 tools.line = function () {
 var tool = this;
 this.started = false;
 this.mousedown = function (ev) {
 tool.started = true;
 tool.x0 = ev._x;
 tool.y0 = ev._y;
 };
 this.mousemove = function (ev) {
 if (!tool.started) {
 return;
 }
 context.clearRect(0, 0, canvas.width, canvas.height);
 // Begin the line.
 context.beginPath();
 context.moveTo(tool.x0, tool.y0);
 context.lineTo(ev._x,   ev._y);
 context.stroke();
 context.closePath();
 };
 // Now you can draw lines when the line tool is seletcted.
 this.mouseup = function (ev) {
 if (tool.started) {
 tool.mousemove(ev);
 tool.started = false;
 img_update();
 }
 };
 };

 init();
 }, false); }

 window.onload = function() {
var bMouseIsDown = false;

   var oCanvas = document.getElementById("drawingCanvas");
   var oCtx = oCanvas.getContext("2d");
var iWidth = oCanvas.width;
   var iHeight = oCanvas.height;
function showDownloadText() {
   document.getElementById("textdownload").style.display = "block";
   }
function hideDownloadText() {
   document.getElementById("textdownload").style.display = "none";
   }
function convertCanvas(strType) {
   if (strType == "PNG")
   var oImg = Canvas2Image.saveAsPNG(oCanvas, true);
   if (strType == "BMP")
   var oImg = Canvas2Image.saveAsBMP(oCanvas, true);
   if (strType == "JPEG")
   var oImg = Canvas2Image.saveAsJPEG(oCanvas, true);
 if (!oImg) {
   alert("Sorry, this browser is not capable of saving." + strType + " files!");
   return false;
   }
oImg.id = "canvasimage";
 oImg.style.border = oCanvas.style.border;
   oCanvas.parentNode.replaceChild(oImg, oCanvas);
howDownloadText();
   }
function saveCanvas(pCanvas, strType) {
   var bRes = false;
   if (strType == "PNG")
   bRes = Canvas2Image.saveAsPNG(oCanvas);
   if (strType == "BMP")
   bRes = Canvas2Image.saveAsBMP(oCanvas);
   if (strType == "JPEG")
   bRes = Canvas2Image.saveAsJPEG(oCanvas);
if (!bRes) {
   alert("Sorry, this browser is not capable of saving " + strType + " files!");
   return false;
   }
   }
document.getElementById("convertpngbtn").onclick = function() {
   convertCanvas("PNG");
   }
document.getElementById("resetbtn").onclick = function() {
   var oImg = document.getElementById("canvasimage");
   oImg.parentNode.replaceChild(oCanvas, oImg);
 hideDownloadText();
   }}

   var colorPalette = [ //Begin array of color table hex color codes.

"#000000","#000000","#000000","#000000","#003300","#006600","#009900","#00CC00","#00FF00","#330000","#333300","#336600","#339900","#33CC00","#33FF00","#660000","#663300","#666600","#669900","#66CC00","#66FF00",

"#000000","#333333","#000000","#000033","#003333","#006633","#009933","#00CC33","#00FF33","#330033","#333333","#336633","#339933","#33CC33","#33FF33","#660033","#663333","#666633","#669933","#66CC33","#66FF33",

"#000000","#666666","#000000","#000066","#003366","#006666","#009966","#00CC66","#00FF66","#330066","#333366","#336666","#339966","#33CC66","#33FF66","#660066","#663366","#666666","#669966","#66CC66","#66FF66",

"#000000","#999999","#000000","#000099","#003399","#006699","#009999","#00CC99","#00FF99","#330099","#333399","#336699","#339999","#33CC99","#33FF99","#660099","#663399","#666699","#669999","#66CC99","#66FF99",

"#000000","#CCCCCC","#000000","#0000CC","#0033CC","#0066CC","#0099CC","#00CCCC","#00FFCC","#3300CC","#3333CC","#3366CC","#3399CC","#33CCCC","#33FFCC","#6600CC","#6633CC","#6666CC","#6699CC","#66CCCC","#66FFCC",

"#000000","#FFFFFF","#000000","#0000FF","#0033FF","#0066FF","#0099FF","#00CCFF","#00FFFF","#3300FF","#3333FF","#3366FF","#3399FF","#33CCFF","#33FFFF","#6600FF","#6633FF","#6666FF","#6699FF","#66CCFF","#66FFFF",

"#000000","#FF0000","#000000","#990000","#993300","#996600","#999900","#99CC00","#99FF00","#CC0000","#CC3300","#CC6600","#CC9900","#CCCC00","#CCFF00","#FF0000","#FF3300","#FF6600","#FF9900","#FFCC00","#FFFF00",

"#000000","#00FF00","#000000","#990033","#993333","#996633","#999933","#99CC33","#99FF33","#CC0033","#CC3333","#CC6633","#CC9933","#CCCC33","#CCFF33","#FF0033","#FF3333","#FF6633","#FF9933","#FFCC33","#FFFF33",

"#000000","#0000FF","#000000","#990066","#993366","#996666","#999966","#99CC66","#99FF66","#CC0066","#CC3366","#CC6666","#CC9966","#CCCC66","#CCFF66","#FF0066","#FF3366","#FF6666","#FF9966","#FFCC66","#FFFF66",

"#000000","#FFFF00","#000000","#990099","#993399","#996699","#999999","#99CC99","#99FF99","#CC0099","#CC3399","#CC6699","#CC9999","#CCCC99","#CCFF99","#FF0099","#FF3399","#FF6699","#FF9999","#FFCC99","#FFFF99",

"#000000","#00FFFF","#000000","#9900CC","#9933CC","#9966CC","#9999CC","#99CCCC","#99FFCC","#CC00CC","#CC33CC","#CC66CC","#CC99CC","#CCCCCC","#CCFFCC","#FF00CC","#FF33CC","#FF66CC","#FF99CC","#FFCCCC","#FFFFCC",

"#000000","#FF00FF","#000000","#9900FF","#9933FF","#9966FF","#9999FF","#99CCFF","#99FFFF","#CC00FF","#CC33FF","#CC66FF","#CC99FF","#CCCCFF","#CCFFFF","#FF00FF","#FF33FF","#FF66FF","#FF99FF","#FFCCFF","#FFFFFF"

];

$(document).ready(function() {
 // Handles showing/hiding the color table
   $("#colorTable").hide();

   $("#color").click(function() {
   $("#colorTable").show();
   });
   $(document).click(function() {
   $("#colorTable").hide();
   });
   $("#color").click(function(event) {
   event.stopPropagation();
   });
   });
function LoadColorTable() { // Populate the color picker table with colors specified in the 'colorPalette' array
   for (i = 0; i < colorPalette.length; i++) {
   var colorDiv = document.createElement("div");
   colorDiv.className = "color";
   colorDiv.id = "colorSwatch" + i;
   colorDiv.style.backgroundColor = colorPalette[i];
   colorDiv.setAttribute("onclick", "SetColor(id);");
   document.getElementById("colorTable").appendChild(colorDiv);
   };
   }
function SetColor(id) { // Set the color of the drawing tool when a color swatch is clicked
   context.strokeStyle = document.getElementById(id).style.backgroundColor;
   }