var tm = require('to-markdown').toMarkdown;
var input = 'm.html';
var output = 'm.md';
var fs = require('fs');

fs.readFile(input, 'utf-8', function(e, data){
    console.log(data);
    fs.writeFile(output, tm(data), function(e,data){
        if(!e) {
            console.log('ok');
        }
    })
});

//console.log(tm('<h2>hello</h2>'));

