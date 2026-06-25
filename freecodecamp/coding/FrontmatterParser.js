/**
 * 
 * 
 * Frontmatter Parser
Given a string representing a frontmatter block, parse it and return an object (JavaScript) or dictionary (Python) with the keys and values.

Frontmatter is wrapped in --- delimiters and contains key: value pairs within them, one per line. For example:

---
title: My Post
draft: false
views: 100
---
Should return:

{
  title: "My Post",
  draft: false,
  views: 100
}
Numbers, Booleans, and Strings should all be returned as their respective type.
The given string will have new lines separated with the newline character ("\n"). The above example would be given as: "---\ntitle: My Post\ndraft: false\nviews: 100\n---".
 */


const { benchmark } = require("./utils/benchmark");



function parseFrontmatter(str){

    str = str.replace("---\n", "").replace("\n---");

    const result  = {};
    const lis = str.split("\n");

    for(const item of lis){
        const [key, value] = item.split(": ");


        if(/[0-9]\./.test(value)){
            result[key] = parseFloat(value);
        }else if(value.toLowerCase() === "true"){
            result[key] = true;
        }else if(value.toLowerCase() === "false"){
            result[key] = false;
        }else {
            try{
                result[key] = parseInt(value, 10);
            }catch(err){
                result[key] = value;
            }
        }
    }

    return result;
}


/**
 * 
 * 
 * 
 * => The regex /[0-9]\./ is a bit fragile: it matches any digit followed by a dot, but won't catch
 *      "0.5" or "123.0". A better check is !isNaN(value) && value.includes('.').
 * => parseInt doesn't throw exceptions - it returns NaN if parsing fails. So the try/catch block isn't needed. You can just check isNan().
 */
function parseFrontmatter2(text){

    let lines = text.trim().split("\n");
    if(lines[0] === "---") lines = lines.slice(1);
    if(lines[lines.length - 1] === "---") lines = lines.slice(0, -1);

    const result = {};

    for(const line of lines){
        const [key, value] = line.split(": ");
        if(value === "true"){
            result[key] = true;
        }else if(value === "false"){
            result[key] = false;
        }else if(!isNaN(value)){
            result[key] = Number(value);
        }else{
            result[key] = value;
        }
    }

    return result;
}





if(require.main === module){
    benchmark({"first": parseFrontmatter2}, TESTCASES, 10000);
}

module.exports = { parseFrontmatter2}