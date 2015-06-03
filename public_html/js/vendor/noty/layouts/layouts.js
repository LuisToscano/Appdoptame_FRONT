/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function loadjscssfile(filename, filetype){
    if (filetype==="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", filename);
    }
    else if (filetype==="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
    }
    if (typeof fileref!=="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref);
}

loadjscssfile("js/vendor/noty/layouts/bottom.js", "js"); //dynamically load and add this .js file
loadjscssfile("js/vendor/noty/layouts/bottomCenter.js", "js"); //dynamically load "javascript.php" as a JavaScript file
loadjscssfile("js/vendor/noty/layouts/bottomLeft.js", "js"); //dynamically load "javascript.php" as a JavaScript file
loadjscssfile("js/vendor/noty/layouts/bottomRight.js", "js"); //dynamically load "javascript.php" as a JavaScript file
loadjscssfile("js/vendor/noty/layouts/center.js", "js"); //dynamically load "javascript.php" as a JavaScript file
loadjscssfile("js/vendor/noty/layouts/centerLeft.js", "js"); //dynamically load "javascript.php" as a JavaScript file
loadjscssfile("js/vendor/noty/layouts/centerRight.js", "js"); //dynamically load "javascript.php" as a JavaScript file
loadjscssfile("js/vendor/noty/layouts/inline.js", "js"); //dynamically load "javascript.php" as a JavaScript file
loadjscssfile("js/vendor/noty/layouts/top.js", "js"); //dynamically load "javascript.php" as a JavaScript file
loadjscssfile("js/vendor/noty/layouts/topCenter.js", "js"); //dynamically load "javascript.php" as a JavaScript file
loadjscssfile("js/vendor/noty/layouts/topLeft.js", "js"); //dynamically load "javascript.php" as a JavaScript file
loadjscssfile("js/vendor/noty/layouts/topRight.js", "js"); //dynamically load "javascript.php" as a JavaScript file

loadjscssfile("js/vendor/noty/themes/default.js", "js"); //dynamically load "javascript.php" as a JavaScript file
loadjscssfile("js/vendor/noty/themes/bootstrap.js", "js"); //dynamically load "javascript.php" as a JavaScript file
loadjscssfile("js/vendor/noty/themes/relax.js", "js"); //dynamically load "javascript.php" as a JavaScript file


//loadjscssfile("mystyle.css", "css") ////dynamically load and add this .css file