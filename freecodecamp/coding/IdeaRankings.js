/**
 * 
 * 
 * Idea Rankings
Given a 2D array where each inner array contains (in this order) an idea name, an optimistic estimate, a realistic estimate, and a pessimistic estimate (in days), return an array of the idea names sorted by expected time to completion, shortest first.

Calculate the expected time to completion for each idea using the following formula:

expected = ((optimistic + 4 * realistic + pessimistic) / 6) * length of idea name
 */


const { benchmark } = require("./utils/benchmark");



const TESTCASES = [
    [[[["Add logging", 2, 5, 15], ["SEO optimization", 4, 8, 20], ["Fix bug", 1, 3, 5]]], ["Fix bug", "Add logging", "SEO optimization"]],
    [[[["Dark mode", 1, 3, 8], ["Real-time collaboration feature", 6, 12, 20], ["Add tooltip", 1, 2, 4]]], ["Add tooltip", "Dark mode", "Real-time collaboration feature"]],
    [[[["Update user profile page", 3, 7, 14], ["Add pagination", 2, 5, 10], ["Add tags", 2, 3, 6], ["Fix login bug", 1, 4, 8]]], ["Add tags", "Fix login bug", "Add pagination", "Update user profile page"]],
    [[[["Migrate database", 14, 25, 40], ["Add chat assistant", 8, 15, 24], ["Redesign onboarding flow", 3, 7, 13], ["Add language support", 6, 11, 18]]], ["Redesign onboarding flow", "Add language support", "Add chat assistant", "Migrate database"]],
    [[[["Add email notifications", 3, 7, 10], ["Migrate deployment flow", 6, 10, 16], ["Add push notifications", 2, 6, 10], ["Optimize continuous integration", 5, 8, 15], ["Analyze user patterns", 5, 10, 18], ["Create onboarding curriculum", 6, 15, 25]]], ["Add push notifications", "Add email notifications", "Analyze user patterns", "Migrate deployment flow", "Optimize continuous integration", "Create onboarding curriculum"]]
];

function analyzeIdeas(ideas){
    const result = [];

    for(const [idea, optimistic, realistic, pessimistic] of ideas){
        let expected = ((optimistic + 4 * realistic + pessimistic) / 6 ) * idea.length;
        result.push([idea, expected]);
    }

    return result.sort((a, b) => a[1] - b[1]).map(item => item[0]);
}


function ideaRankings(ideas){
    function expectedTime([name, opt, real, pess]){
        const base = (opt + 4 * real + pess) / 6;
        return base * name.length;
    }

    return ideas
        .slice() // copy to avoid mutating
        .sort((a, b) => expectedTime(a) - expectedTime(b))
        .map(idea => idea[0]);
}


if(require.main === module){
    benchmark({"first": analyzeIdeas, "second": ideaRankings}, TESTCASES, 10000);
}

module.exports = { analyzeIdeas, ideaRankings };