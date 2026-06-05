/***
 * 
 * 
 * Open Issues
Given an array of issue numbers and another array of pull request (PR) numbers, return an array of issues that remain open after all PRs have been merged.

A PR closes an issue if their digits are a rotation of each other. For example, issue 123 would be closed by PR 231 or 312.
A PR does not close an issue with the exact same number. For example, PR 123 does not close issue 123. So an issue with all the same number can't get closed.
Either number may have leading zeros stripped. For example, PR 201 would close issue 12 (012, a rotation of 201). Similarily, issue 201 would be closed by PR 12.
Return the remaining open issues in the order they were given.


 */


const { benchmark } = require("./utils/benchmark");


const TESTCASES = [
    [[[123, 234], [231]], [234]],
    [[[123, 345, 16], [345, 231]], [345, 16]],
    [[[456, 332, 12, 15], [201, 945, 180]], [456, 332, 15]],
    [[[12, 115, 296, 170, 24], [17, 18, 19, 20, 21]], [115, 296, 24]],
    [[[19, 95, 422, 395, 754, 102, 296, 709, 237, 4400, 1802], [395, 440, 9001, 95, 242, 21, 287, 169, 14]], [95, 395, 754, 296, 709, 237, 1802]]
];


function isClosed(issue, pr){
    // Same number never closes the issue

    if(issue === pr) return false;

    let a = String(issue);
    let b = String(pr);

    const n = Math.max(a.length, b.length);

    a = a.padStart(n, "0");
    b = b.padStart(n, "0");

    return (a + a).includes(b);
}


function getOpenIssues(issues, prs){
    return issues.filter(issue => !prs.some(pr => isClosed(issue, pr)));
}




function rotations(numStr){
    // Generate all rotations of a number string.
    // Stripping leading zeros.

    const rots = [];

    for(let i = 0; i < numStr.length; i++){
        const rot = numStr.slice(i) + numStr.slice(0, i);

        // Equivalent to Python's str(int(rot))
        rots.push(String(Number(rot)));
    }

    return rots;
}

function getOpenIssues2(issues, prs){
    const result = [];

    for(const issue of issues){
        let closed = false;

        for (const pr of prs){

            // Use the maximum length because either side
            // may have stripped leading zeros.
            const length = Math.max(String(issue).length, String(pr).length);

            const issueStr = String(issue).padStart(length, "0");

            // Same number value never closes the issue.
            if (issue === pr) continue;

            for(const rot of rotations(issueStr)){
                // Compare against the actual PR value,

                if (rot === String(pr)){
                    closed = true;
                    break;
                }
            }
            if(closed) break;
        }if(!closed) result.push(issue);
    }
    return result;
    
}



if (require.main === module) {
    benchmark({ getOpenIssues, getOpenIssues2}, TESTCASES, 10000);
}

module.exports = { getOpenIssues, getOpenIssues2 };