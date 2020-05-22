var mouseDown = false;

var header1 =
  "<!DOCTYPE html>\n" +
  "<html>\n" +
  "<head>\n" +
  "  <meta charset=\"utf-8\" />\n" +
  "  <title>";

var header2 = "</title>\n" +
  "  <style type=\"text/css\">\n" +
  "    html, body { margin: 0; }\n" +
  "  </style>\n" +
  "</head>\n" +
  "<body>\n\n" +
  "<div id=\"container\">";

// var footer = "</div>\n\n" +
//   "<script src=\"http://d3js.org/d3.v4.min.js\"></script>\n" +
//   "<script src=\"htpad.js\"></script>\n" +
//   "</body>\n" +
//   "</html>\n";

var tool = 0;
// 0: pen, 1: eraser, 2: select

var penLink = d3.select("#menu #pen");
var eraserLink = d3.select("#menu #eraser");
// var selectLink = d3.select("#menu #select");

var drag = d3.drag()
    .container(function() { return this; })
    .subject(function() { var p = [d3.event.x, d3.event.y]; return [p, p]; })
    .on("start", dragstarted)
    .on("end", dragended);
var lasso;

function setTool(t) {
  tool = t;
  penLink.attr("style", (t == 0) ? "color:red" : "");
  eraserLink.attr("style", (t == 1) ? "color:red" : "");
  // selectLink.attr("style", (t == 2) ? "color:red" : "");

  if (t == 0 || t == 1) {
    svg.call(drag);
  } else {
    lasso = d3.lasso()
      .closePathSelect(true)
      .closePathDistance(1000)
      .items(d3.selectAll("#container path"))
      .targetArea(svg)
      .on("start",lasso_start)
      .on("draw",lasso_draw)
      .on("end",lasso_end);
    svg.call(lasso);
  }

  if (d3.event) d3.event.preventDefault();
}

window.onload =function() {
  d3.selectAll("#menu a")
    .on("click", function() { d3.event.preventDefault(); });

  d3.select("#menu #save").on("mousedown", function() { save(0); });
  d3.select("#menu #export").on("mousedown", function() { save(1); });
  d3.select("#menu #export-svg").on("mousedown", function() { save(2); });

  penLink.on("mousedown", function() { setTool(0); });
  eraserLink.on("mousedown", function() { setTool(1); });
  // selectLink.on("mousedown", function() { setTool(2); });
  setTool(0);
};

var line = d3.line().curve(d3.curveBasis);

var svg = d3.selectAll("#container svg").call(drag);

d3.selectAll("#container path").on("mouseover", overpath);

function save(mode) {
  d3.event.preventDefault();
  var data;
  var filename;

  if (mode == 0) { // Save As
    filename = "note_1.html";
    data = document.documentElement.outerHTML;
  } else if (mode == 1) { // Export HTML
    filename = "note_1_export.html";
    data = header1 + "Note" + header2 +
           document.getElementById('container').innerHTML +
           "</body>\n</html>\n";
  } else { // Export SVG
    filename = "note_1.svg";
    data = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n" +
           document.getElementById('page1').outerHTML;
  }
  var blob = new Blob([data], {type: 'text/html'});
  if(window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename);
  } else{
    var elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;        
    document.body.appendChild(elem);
    elem.click();        
    document.body.removeChild(elem);
  }
}


function overpath() {
  if (mouseDown && tool == 1) {
    //console.log('hit');
    this.parentNode.removeChild(this);
  }
}

function dragstarted() {
  mouseDown = true;
  if (tool != 0) return true;
  var first = 0;
  var d = d3.event.subject;
  var active = svg.select(".notes").append("path").datum(d);
  active.on("mouseover", overpath);
  var x0, y0;

  d3.event.on("drag", function() {
    var x1 = d3.event.x,
        y1 = d3.event.y,
        dx = x1 - x0,
        dy = y1 - y0;
    if (first < 1) {
      x0 = x1;
      y0 = y1;
      first++;
    } else {
      if (dx * dx + dy * dy > 0) {
        d.push([x0 = x1, y0 = y1]);
      } else {
        d[d.length - 1] = [x1, y1];
      }

      active.attr("d", function (d) { return line(d).replace(/(\.[0-9])[0-9]+/g, "$1"); });
    }
  });
}

function dragended() {
  mouseDown = false;
}


// Lasso functions
var lasso_start = function() {
    lasso.items()
        // .attr("r",3.5) // reset size
        .classed("not_possible",true)
        .classed("selected",false);
};

var lasso_draw = function() {

    // Style the possible dots
    lasso.possibleItems()
        .classed("not_possible",false)
        .classed("possible",true);

    // Style the not possible dot
    lasso.notPossibleItems()
        .classed("not_possible",true)
        .classed("possible",false);
};

var lasso_end = function() {
    // Reset the color of all dots
    lasso.items()
        .classed("not_possible",false)
        .classed("possible",false);

    // Style the selected dots
    lasso.selectedItems()
        .classed("selected",true);


};

