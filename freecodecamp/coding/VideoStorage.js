/**
 * 
 * 
 * Video Storage
Given a video size, a unit for the video size, a hard drive capacity, and a unit for the hard drive, return the number of videos the hard drive can store using the following constraints:

The unit for the video size can be bytes ("B"), kilobytes ("KB"), megabytes ("MB"), or gigabytes ("GB").
If not given one of the video units above, return "Invalid video unit".
The unit of the hard drive capacity can be gigabytes ("GB") or terabytes ("TB").
If not given one of the hard drive units above, return "Invalid drive unit".
Return the number of whole videos the drive can fit.
Use the following conversions:
Unit	Equivalent
1 B	1 B
1 KB	1000 B
1 MB	1000 KB
1 GB	1000 MB
1 TB	1000 GB
For example, given 500, "MB", 100, and "GB" as arguments, determine how many 500 MB videos can fit on a 100 GB hard drive.
 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [[500, "MB", 100, "GB"], 200],
    [[1, "TB", 10, "TB"], "Invalid video unit"],
    [[2000, "MB", 100000, "MB"], "Invalid drive unit"],
    [[500000, "KB", 2, "TB"], 4000],
    [[1.5, "GB", 2.2, "TB"], 1466]
];


function numberOfVideos(videoSize, videoUnit, driveSize, driveUnit){
    const videoConversions = {
        B: 1,
        KB: 1000,
        MB: 1000 * 1000,
        GB: 1000 * 1000 * 1000
    }

    const driveConversions = {
        GB: 1000 * 1000 * 1000,
        TB: 1000 * 1000 * 1000 * 1000
    }

    if(!(videoUnit in videoConversions)){
        return "Invalid video unit";
    }

    if(!(driveUnit in driveConversions)){
        return "Invalid drive unit";
    }

    const videoSizeInBytes = videoSize * videoConversions[videoUnit];
    const driveSizeInBytes = driveSize * driveConversions[driveUnit];

    return Math.floor(driveSizeInBytes / videoSizeInBytes);
}


if(require.main === module){
    benchmark({"first": numberOfVideos}, TESTCASES, 10000);
}