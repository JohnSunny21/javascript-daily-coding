/**
 * 
 * Issue Triage 2
Given an issue title and an array of current labels, return an updated array of labels based on the following rules:

If the issue doesn't have any labels, add:

"bug" and "needs triage" if the title contains "error" or "bug"
"enhancement" and "discussing" if the title contains "feature" or "add"
Otherwise, if the given labels contain:

"needs triage" and the title contains "simple" or "easy", remove "needs triage" and add "good first issue"
"discussing" and the title contains "planned" or "next", remove "discussing" and add "on the roadmap"
Otherwise, if "needs triage" or "discussing" is present, remove it and add "help wanted"
If the title contains:

"security", add a "critical" label
 * 
 */

const { benchmark } = require("./utils/benchmark");

const TESTCASES = [
  [
    ["app crashes with error", []],
    ["bug", "needs triage"],
  ],
  [
    ["app crashes with error", ["bug", "needs triage"]],
    ["bug", "help wanted"],
  ],
  [
    ["add dark mode", []],
    ["enhancement", "discussing"],
  ],
  [
    ["add dark mode", ["enhancement", "discussing"]],
    ["enhancement", "help wanted"],
  ],
  [
    ["xss security bug", []],
    ["bug", "needs triage", "critical"],
  ],
  [["security vulnerability in auth", []], ["critical"]],
  [
    ["easy a11y fix", ["bug", "needs triage"]],
    ["bug", "good first issue"],
  ],
  [
    ["planned api migration", ["enhancement", "discussing"]],
    ["enhancement", "on the roadmap"],
  ],
  [
    ["improve security", ["enhancement", "discussing"]],
    ["enhancement", "help wanted", "critical"],
  ],
];

function triageIssue(title, labels) {
  if (!labels.length) {
    if (title.includes("bug") || title.includes("error")) {
      labels.push("bug");
      labels.push("needs triage");
    } else if (title.includes("feature") || title.includes("add")) {
      labels.push("enhancement");
      labels.push("discussing");
    }
  } else if (
    labels.includes("needs triage") &&
    (title.includes("simple") || title.includes("easy"))
  ) {
    const index = labels.indexOf("needs triage");

    labels = labels.slice(0, index).concat(labels.slice(index + 1));
    labels.push("good first issue");
  } else if (
    labels.includes("discussing") &&
    (title.includes("planned") || title.includes("next"))
  ) {
    const index = labels.indexOf("discussing");
    labels = labels.slice(0, index).concat(labels.slice(index + 1));
    labels.push("on the roadmap");
  } else {
    if (labels.includes("needs triage")) {
      const index = labels.indexOf("needs triage");

      labels = labels.slice(0, index).concat(labels.slice(index + 1));
    } else if (labels.includes("discussing")) {
      const index = labels.indexOf("discussing");

      labels = labels.slice(0, index).concat(labels.slice(index + 1));
    }
    labels.push("help wanted");
  }

  if (title.includes("security")) {
    labels.push("critical");
  }
  return labels;
}

function triageIssue2(title, labels) {
  title = title.toLowerCase(); // normalize once
  labels = [...labels];
  if (labels.length === 0) {
    if (title.includes("bug") || title.includes("error")) {
      labels.push("bug", "needs triage");
    } else if (title.includes("feature") || title.includes("add")) {
      labels.push("enhancement", "discussing");
    }
  } else if (
    labels.includes("needs triage") &&
    (title.includes("simple") || title.includes("easy"))
  ) {
    labels = labels.filter((l) => l !== "needs triage");
    labels.push("good first issue");
  } else if (
    labels.includes("discussing") &&
    (title.includes("planned") || title.includes("next"))
  ) {
    labels = labels.filter((l) => l !== "discussing");
    labels.push("on the roadmap");
  } else {
    if (labels.includes("needs triage") || labels.includes("discussing")) {
      labels = labels.filter((l) => l !== "needs triage" && l !== "discussing");
    }
    labels.push("help wanted");
  }

  if (title.includes("security")) {
    labels.push("critical");
  }

  return labels;
}

/**
 *
 * => Instead of slicing manually, labels.filter(...) is cleaner and avoids index JUGGLING.
 * => NORMALIZE THE TITLE once at the top.
 */

if (require.main === module) {
  console.log(triageIssue2("app crashes with error", []));
  console.log(triageIssue2("app crashes with error", ["bug", "needs triage"]));
  benchmark({ first: triageIssue, second: triageIssue2 }, TESTCASES, 10000);
}

module.exports = { triageIssue, triageIssue2 };
