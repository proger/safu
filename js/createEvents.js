import {
    fileReader
} from './fileReader.js';

const queryString = window.location.search; //get url
const urlParams = new URLSearchParams(queryString); //find param

fileReader.setFile(urlParams.get('f') + ".json"); //open file
var text = fileReader.readTextFile(); //read file
text = JSON.parse(text);

document.getElementById("title").innerHTML = text["title"]
document.getElementById("subtitle").innerHTML = text["subtitle"] == undefined ? "" : text["subtitle"];


var result = "";
for (var key in text["paragraphs"]) {
    if (key.startsWith("bold"))
        result += "<p><b>" + text["paragraphs"][key] + "</b></p>"
    else if (key.startsWith("normal"))
        result += "<p>" + text["paragraphs"][key] + "</b>"
    else if (key.startsWith("title"))
        result += "<p class='paragraph-title'>" + text["paragraphs"][key] + "</b>"
    else if (key.startsWith("img"))
        result += "<img src='" + text["paragraphs"][key] + "' style='margin:40px 0;'>"
    else if (key.startsWith("flyer"))
        result += "<p><a href='Events/" + key.substring(5) + ".pdf' download>" + text["paragraphs"][key] + "</a></p>";
    else if (key.startsWith("list")){
        result += "<ul>";
        for (var elem in text["paragraphs"][key]) 
            result += "<li> - "+text["paragraphs"][key][elem]+"</li>";
        result += "</ul>";
    }
    else if(key.startsWith("map")){
        result += '<div style="width: 100%"><iframe width="100%" height="600" style="margin-bottom: 100px;" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="'+text["paragraphs"][key]+'"><a href="https://www.maps.ie/distance-area-calculator.html">measure distance on map</a></iframe></div>';
    }
}
document.getElementById("content").innerHTML = result;