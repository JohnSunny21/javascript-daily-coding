/**
 * 
 * 
 * Photo Storage
Given a photo size in megabytes (MB), and hard drive capacity in gigabytes (GB), return the number of photos the hard drive can store using the following constraints:

1 gigabyte equals 1000 megabytes.
Return the number of whole photos the drive can store.
 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [[1, 1], 1000],
    [[2, 1], 500],
    [[4, 256], 64000],
    [[3.5, 750], 214285],
    [[3.5, 5.5], 1571]
];


function numberOfPhotos(photoSizeMb, hardDriveSizeGb){
    const capacityInMB = hardDriveSizeGb * 1000;

    return Math.floor(capacityInMB / photoSizeMb);
}



if(require.main === module){
    benchmark({"first": numberOfPhotos}, TESTCASES, 10000);
}