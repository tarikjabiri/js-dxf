/*
Lightweight JavaScript Syntax Highlighter
By: Kira L

You can do whatever you want with the code; I don't need recognition if you include it in a project. You can copy parts of the code or change the code for your own projects however you would like!
All of the script is in this one file.
*/
const highlight = (() => {
let toR;
const stripper = document.createElement("div"); //this is used to strip HTML from the code
//creates a CSS element with all of the colors
const style = document.createElement("style");
style.type = "text/css";
style.innerHTML = `.pink{
	color: #FF237A;
	display: inline-block;
}
.purple{
	color: #AE60F6;
	display: inline-block;
}
.red{
    color: #FF3B3B;
	display: inline-block;
}
.operator{
    color: #79c0ff;
	display: inline-block;
}

.ital{
	font-style: italic;
}
.blue{
	color: #6DC5FB;
	display: inline-block;
}
.green{
	color: #A6E06C;
	display: inline-block;
}
.yellow{
	color: #F3E688;
	display: inline-block;
}
.grey{
	color: #B0B0B0;
	display: inline-block;
}
.code{
	font-size: 14px;
	color: white;
	background: #161B22;
}

/*don't change this stuff*/
div{
	margin: 0;
	min-height: 1em;
}
.code{
	padding: 5px;
	display: block;
}
`;
document.getElementsByTagName("head")[0].appendChild(style);

function replace(toConv, dontWant, doWant){
    const tempList = toConv.split(dontWant);
    return tempList.join(doWant);
}
function replSymb(st){
    toR = st;
    st = replace(st, "&","&amp");//replace the symbols to avoid confusion with HTML
    st = replace(st, "=","&equals;");
    st = replace(st, "\"","&quot");
    st = replace(st, "<","&lt");
    st = replace(st, ">","&gt");
    return st;
}

function colorW(words, color){ //color a word
    for (let i = 0; i < words.length; i++) {
        toR = toR.split(words[i]);
        toR = toR.join("<div class='"+color+"'>"+words[i]+"</div>"); //wraps the word in a colored div
    }
}
function quotes(){
	//this splits the text into a list separated by the "s. It takes every odd element of the list except the last (the 1, 3, 5, ...) and colors it yellow (a string)
    toR = toR.split("&quot");
    for (let i = 1; i < toR.length; i+=2) {
        toR[i] = "<div class='yellow'>&quot"+toR[i]+"&quot</div>";
    }
    toR = toR.join("");
}

function stripHtml(html) {
    stripper.innerHTML = html;
    return stripper.textContent;
}
function comments(){
	//splits it up by lines. Then colors and commented part grey.
    toR = toR.split("</div><div>");
    for (let i = 0; i < toR.length; i++) {
        if(toR[i].split("//").length > 1){ //comments are grey
            toR[i] = toR[i].split("//")[0] +"<div class='grey'>//"+ stripHtml(toR[i].split("//")[1]) + "</div>";
        }
    }
    toR = toR.join("</div><div>");
}
function functions(){
    toR = toR.split("(");
    for (let i = 0; i < toR.length-1; i++) {
        let lastWord = toR[i];
        lastWord = lastWord.split(" ")[lastWord.split(" ").length-1];
        lastWord = lastWord.split("</div>")[lastWord.split("</div>").length-1]; //line break
        lastWord = lastWord.split(".")[lastWord.split(".").length-1]; //this is the last word before the (

        let secondLast = toR[i].slice(0,-lastWord.length-1);
        secondLast = secondLast.split(" ")[secondLast.split(" ").length-1];
        secondLast = secondLast.split("</div>")[secondLast.split("</div>").length-1]; //line break
        secondLast = secondLast.split(".")[secondLast.split(".").length-1]; //this is the 2nd to last word before the (
        if(secondLast == "function"){ //if the previous word is "function", you are defining a function so color it green
            toR[i] = toR[i].slice(0,toR[i].length-lastWord.length) + "<div class='green'>"+lastWord+"</div>";
        }else{
            toR[i] = toR[i].slice(0,toR[i].length-lastWord.length) + "<div class='blue'>"+lastWord+"</div>";
        }
    }
    toR = toR.join("(");
}
return (toH) => {
	//if you want to change colors, change the CSS in the string at the top
    toR = toH;
    toR = replSymb(toR);
    toR = replace(toR, "\n", "</div><div>");

    functions(); //highlight all of the functions
    colorW(["&equals;","+","-","*","|","^","%","$","&lt","&gt","&amp"],"operator"); //makes all operators pink
    colorW(["0","1","2","3","4","5","6","7","8","9","#"], "purple"); //makes all numbers purple
    colorW(["if","else","return","while","for"],"pink"); //makes all loops pink
    colorW(["function", "document","console"], "blue ital"); //makes all special words italicized and blue
    colorW(["var","let", "const"], "red");
    colorW(["new"], "green");
    quotes(); //colors all strings yellow
    comments(); //colors all comments grey

    toR = replace(toR, "  ", "&nbsp&nbsp");
    return toR;
};
})();
