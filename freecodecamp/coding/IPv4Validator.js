/***
 * 
 * 
 * 
 * IPv4 Validator
Given a string, determine if it is a valid IPv4 Address. A valid IPv4 address consists of four integer numbers separated by dots (.). Each number must satisfy the following conditions:

It is between 0 and 255 inclusive.
It does not have leading zeros (e.g. 0 is allowed, 01 is not).
Only numeric characters are allowed.
 */


const { benchmark } = require("./utils/benchmark");



const TESTCASES = [
    [["192.168.1.1"], true],
    [["0.0.0.0"], true],
    [["255.255.255.255"], true],
    [["208.67.222.222"], true],
    [["255.01.50.111"], false],
    [["255.00.50.111"], false],
    [["256.101.50.115"], false],
    [["192.168.101."], false],
    [["192168145213"], false],
    [["192.168.1.a"], false],
    [["192.168.o.1"], false],
    [["192.168.1.1a"], false]
];



function isValidIPv4(ip){
    const parts = ip.split(".");

    if(parts.length !== 4){
        return false;
    }

    for(const part of parts){
        if(!/^\d+$/.test(part)){
            return false;
        }

        if(part.length > 1 && part[0] === "0"){
            return false;
        }

        const num = Number(part);

        if(num < 0 || num > 255){
            return false;
        }
    }

    return true;
}


function isValidIPv4Two(ip) {
return ip.split(".").length === 4 &&
ip.split(".").every(part =>
/^\d+$/.test(part) &&
!(part.length > 1 && part.startsWith("0")) &&
Number(part) <= 255
);
}



if(require.main === module){

    benchmark({"first": isValidIPv4, "second": isValidIPv4Two}, TESTCASES, 10000);
}