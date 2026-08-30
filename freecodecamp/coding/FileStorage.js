/**
 * 
 * 
 * File Storage
Given a file size, a unit for the file size, and hard drive capacity in gigabytes (GB), return the number of files the hard drive can store using the following constraints:

The unit for the file size can be bytes ("B"), kilobytes ("KB"), or megabytes ("MB").
Return the number of whole files the drive can fit.
Use the following conversions:
Unit	Equivalent
1 B	1 B
1 KB	1000 B
1 MB	1000 KB
1 GB	1000 MB
For example, given 500, "KB", and 1 as arguments, determine how many 500 KB files can fit on a 1 GB hard drive.
 */


const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
    [[500, "KB", 1], 2000],
    [[50000, "B", 1], 20000],
    [[5, "MB", 1], 200],
    [[4096, "B", 1.5], 366210],
    [[220.5, "KB", 100], 453514],
    [[4.5, "MB", 750], 166666]
];

function numberOfFiles(fileSize, fileUnit, driveSizeGb){
    const conversions = {
        B: 1,
        KB: 1000,
        MB: 1000 * 1000
    };


    const fileSizeInBytes = fileSize * conversions[fileUnit];
    const driveSizeInBytes = driveSizeGb * 1000 * 1000 * 1000;

    return Math.floor(driveSizeInBytes / fileSizeInBytes);
}



if(require.main === module){
    benchmark({"first": numberOfFiles}, TESTCASES, 10000);
}