var header1 =
  "<!DOCTYPE html>\n" +
  "<html>\n" +
  "  <head>\n" +
  "  <meta charset=\"utf-8\" />\n" +
  "  <title>";

var header2 = "</title>\n" +
  "  <style type=\"text/css\">\n" +
  "    html, body { margin: 0; }\n" +
  "    path { fill: none; stroke: #000; stroke-width: 3px; stroke-linejoin: round; stroke-linecap: round; }\n" +
  "    #menu { position: fixed; top: 0; width: 100%; background-color: #eee; padding: 0.3em; font-size: 1.5em; border: 1px solid black; }\n" +
  "    #menu a { font-weight: bold; text-decoration: none; color: blue; }\n" +
  "    #grid line { stroke: #ddd; stroke-width: 1px; }\n" +
  "  </style>" +
  "</head>\n" +
  "<body>\n\n" +
  "<div id=\"container\">";

var footer = "</div>\n\n" +
  "<script src=\"http://d3js.org/d3.v4.min.js\"></script>\n" +
  "<script src=\"htpad.js\"></script>\n" +
  "</body>\n" +
  "</html>\n";

window.onload =function() {
  // console.log("ready");
  var menu = d3.select("body")
      .insert("div", ":first-child")
      .attr("id", "menu");
  menu.append("a")
      .attr("href", "#")
      .text("save")
      .on("click", save);
  menu.append("span").text(" | ");
  menu.append("a")
      .attr("href", "#")
      .text("export")
      .on("click", save_export);
};

var line = d3.line()
    //.curve(d3.curveLinear);
    .curve(d3.curveBasis);

var svg = d3.selectAll("#container svg")
    .call(d3.drag()
        .container(function() { return this; })
        .subject(function() { var p = [d3.event.x, d3.event.y]; return [p, p]; })
        .on("start", dragstarted));

function save() {
  var data = header1 + "Note" + header2 +
    document.getElementById('container').innerHTML +
    footer;
  // console.log(data);
  var filename = "note_1.html";
  var blob = new Blob([data], {type: 'text/html'});
  if(window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename);
  }
  else{
    var elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;        
    document.body.appendChild(elem);
    elem.click();        
    document.body.removeChild(elem);
  }
}

function save_export() {
  var data = header1 + "Note" + header2 +
    document.getElementById('container').innerHTML +
    "</body>\n</html>\n";
  // console.log(data);
  var filename = "note_1.html";
  var blob = new Blob([data], {type: 'text/html'});
  if(window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename);
  }
  else{
    var elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;        
    document.body.appendChild(elem);
    elem.click();        
    document.body.removeChild(elem);
  }
}

function dragstarted() {
  var first = 0;
  var d = d3.event.subject;
  var active = svg.append("path").datum(d);
  var x0, y0;

  d3.event.on("drag", function() {
    var x1 = Math.round(d3.event.x),
        y1 = Math.round(d3.event.y),
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
      
      //active.attr("d", line);
      //s.replace(/(\.[0-9])[0-9]+/g, "$1");
      active.attr("d", function (d) { return line(d).replace(/(\.[0-9])[0-9]+/g, "$1"); });
    }
  });
}
