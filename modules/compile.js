const {c, cpp, node, python, java} = require('compile-run');
const fs = require('fs');

async function compileProg(source) {
    var result;

    if(source.lang == 'c++') {
        createSource("cpp", source.body);
        result = await cpp.runFile('./sandbox/test.cpp', {timeout: 5000});
    } else if(source.lang == 'c') {
        createSource("c", source.body);
        result = await c.runFile('./sandbox/test.c', {timeout: 5000});
    } else if(source.lang == 'Java') {
        createSource("java", source.body);
        result = await java.runFile('./sandbox/test.java', {timeout: 5000});
    } else if(source.lang == 'Python') {
        createSource("py", source.body);
        result = await python.runFile('./sandbox/test.py', {timeout: 5000});
    }
        
        // const result = await cpp.runFile('./sandbox/test.cpp', {timeout: 3000});
        // console.log(result);
        // console.out(result);
        return result;
    
}

// async function compile() {
//     let result = await c.runFile('../source/test.c');
//     console.log(result.stdout);
//     return result.stdout;
// }

function createSource(lang, source) {
    var path = "./sandbox/test."+lang;
    fs.writeFile( path, source, function (err) {
        if (err) return err;
    });
}

exports.compileProg = compileProg;